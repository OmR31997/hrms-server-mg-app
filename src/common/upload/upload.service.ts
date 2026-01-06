import path from 'path';
import { mkdir, unlink } from "fs/promises";
import crypto from "crypto";
import { ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
import { ENV } from '@config/env.config';
import multer, { diskStorage } from 'multer';
import { FilePath } from '@common/types/payload.type';
import { CloudinaryService } from '@common/cloudinary/cloudinary.service';

@Injectable()
export class UploadService implements OnModuleInit {
    private readonly uploadPath = path.join("public", "uploads");

    constructor(private readonly cloudinaryService: CloudinaryService) { }

    async onModuleInit() {
        if (!ENV.IS_PROD) {
            await mkdir(this.uploadPath, { recursive: true })
        }
    }

    private generateUniqueName(prefix = "", originalname: string): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        const ext = path.extname(originalname);

        return ENV.IS_PROD
            ? `${prefix}${timestamp}${random}`
            : `${prefix}${timestamp}${random}${ext}`;
    }

    private resolveFileSize(max: { sizeType: string; size: number }): number {
        if (max.sizeType === "KB") return max.size * 1024;
        if (max.sizeType === "MB") return max.size * 1024 * 1024;
        return max.size;
    }


    async multerOptions(prefix: "DOC-", maxSize = { sizeType: "MB", size: 5 }) {
        const fileSize = this.resolveFileSize(maxSize);

        const fileFilter = (_req: Express.Request, file: Express.Multer.File, callback: any) => {
            const allowed = [
                "application/pdf",
                "image/png",
                "image/jpeg",
            ];

            if (!allowed.includes(file.mimetype)) {
                return callback(new ForbiddenException("Invalid file type"), false);
            }

            return callback(null, true);
        }

        if (ENV.IS_PROD) {
            return {
                storage: multer.memoryStorage(),
                limits: { fileSize },
                fileFilter
            };
        }

        return {
            storage: diskStorage({
                destination: (_req, file, callback) => callback(null, this.uploadPath),
                filename: (_req, file, callback) => callback(null, this.generateUniqueName(prefix, file.originalname)),
            }),
            limits: { fileSize },
            fileFilter
        }
    }

    async uploadWithRollback(file: Express.Multer.File, folder: string = "VHRMS/files"): Promise<FilePath | undefined> {
        let uploadFile: FilePath = null;

        try {
            if (ENV.IS_PROD) {
                uploadFile = await this.cloudinaryService.toUploadCloudinary(
                    file,
                    folder,
                    `DOC-${crypto.randomBytes(64).toString("hex")}`);
            } else {
                if (!file.path) throw new ForbiddenException("File path missing");
                uploadFile = { secure_url: file.path, public_id: null, resource_type: file.mimetype.startsWith("image/") ? "image" : "raw" }
            }

            return uploadFile;

        } catch (error) {
            if (uploadFile) {
                await this.deleteuploadedFiles(uploadFile);
            }

            throw new ForbiddenException(`Failed to upload file: ${error.message}`);
        }
    }

    async deleteuploadedFiles(file_path: FilePath) {

        if (ENV.IS_PROD && file_path?.public_id) {
            await this.cloudinaryService.deleteFromCloudinary(file_path.public_id, file_path.resource_type );
        }

        if (!ENV.IS_PROD && file_path?.secure_url) {
            try {
                await unlink(file_path.secure_url);
            } catch (error) {
                if (error.code !== "ENOENT")
                    throw new ForbiddenException(`Error deleting file: ${error.message}`)
            }
        }
    }
}
