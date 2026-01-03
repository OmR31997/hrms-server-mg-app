import crypto from "crypto";
import { ENV } from "@config/env.config";
import { deleteLocalFile, validateFile } from "./fileHelper.util";
import { toDeleteFromCloudStorage, toSaveCloudStorage } from "./cloudinary.util";
import { ForbiddenException } from "@nestjs/common";
import { FilePath } from "@common/types/payload.type";
import path from "path";

export const uploadFilesWithRollBack = async (file: Express.Multer.File, folder:string = "VHRMS/files") => {
    let uploadedFile: FilePath = null;

    try {
        await validateFile(
            file,
            [
                "image/png",
                "image/jpeg",
                "image/jpg",
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ],
            { maxSizeMB: 1 }
        );

        if (ENV.IS_PROD) {
            console.log("File :" + file, "Folder: "+folder )
            uploadedFile = await toSaveCloudStorage(
                file,
                folder,
                `DOC-${crypto.randomBytes(64).toString("hex")}`
            );
        } else {
            uploadedFile = { secure_url: path.resolve(file.path), public_id: null };
        }

        return uploadedFile;

    } catch (error) {
        if(uploadedFile) {
            if(ENV.IS_PROD && uploadedFile.public_id) {
                await toDeleteFromCloudStorage(uploadedFile.public_id)
            } else if(uploadedFile.secure_url){
                await deleteLocalFile(uploadedFile.secure_url)
            }
        }

        throw new ForbiddenException("Failed to save file")
    }
}

export const deleteuploadedFiles = async (file_path: FilePath) => {
    if(!file_path) return;

    const {secure_url, public_id} = file_path;

    if(ENV.IS_PROD && public_id) {
       await toDeleteFromCloudStorage(public_id);   
    } else if(secure_url) {
        await deleteLocalFile(secure_url);
    }
}
