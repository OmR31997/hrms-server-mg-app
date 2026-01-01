import crypto from "crypto";
import { ENV } from "@config/env.config";
import { deleteLocalFile, validateFiles } from "./fileHelper.util";
import { toDeleteFromCloudStorage, toSaveCloudStorage } from "./cloudinary.util";
import { UploadedFileResult } from "@common/types/payload.type";
import { ForbiddenException } from "@nestjs/common";

export const uploadFilesWithRollBack = async (files: Express.Multer.File[], folder = "VHRMS/documents") => {
    let uploadedFiles: UploadedFileResult[] = [];

    try {
        await validateFiles(
            files,
            [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ],
            { maxSizeMB: 1 }
        );

        if (ENV.IS_PROD) {
            uploadedFiles = await Promise.all(files.map((file) => toSaveCloudStorage(
                file,
                folder,
                `DOC-${crypto.randomBytes(64).toString("hex")}`
            )));
        } else {
            uploadedFiles = await Promise.all(files.map((file) => ({ secure_url: file.path, public_id: null })));
        }

        return uploadedFiles;

    } catch (error) {
        if (uploadedFiles.length > 0) {
            if (ENV.IS_PROD) {
                await Promise.all(
                    uploadedFiles
                        .map(uploadedFile => uploadedFile?.public_id
                            ? toDeleteFromCloudStorage(uploadedFile.public_id)
                            : null
                        )
                )
            }

            if(!ENV.IS_PROD) {
                await Promise.all(
                    files
                    .filter((file) => file.path)
                    .map((file) => deleteLocalFile(file.path))
                )
            }

            throw new ForbiddenException("Failed to save file")
        }
    }
}