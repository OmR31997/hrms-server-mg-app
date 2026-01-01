import { UploadedFileResult } from "@common/types/payload.type";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";

export const toSaveCloudStorage = async (file: Express.Multer.File, folder: string, fileName: string): Promise<UploadedFileResult> => {
    if (!file) {
        throw new NotFoundException("File missing");
    }

    if (!file.buffer) {
        throw new ForbiddenException("File buffer missing");
    }

    const options = {
        folder,
        public_id: fileName,
        resourse_type: "auto"
    }

    return new Promise<UploadedFileResult>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (error || !result) {
                    return reject(new ForbiddenException("Cloudinary upload failed"))
                }

                resolve({ 
                    secure_url: result.secure_url, 
                    public_id: result.public_id 
                });
            });
        stream.end(file.buffer);
    })
}

export const toDeleteFromCloudStorage = async (public_id: string):Promise<void> => {
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        throw new ForbiddenException("Failed to delete cloud file");
    }
}