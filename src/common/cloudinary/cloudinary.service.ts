import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import fs from "fs/promises";
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { FilePath } from '@common/types/payload.type';
import path from 'path';
import { generateRefreshToken as generateUnique } from '@common/utils';

@Injectable()
export class CloudinaryService {
    constructor(private configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUD_API_KEY'),
            api_secret: this.configService.get<string>('CLOUD_API_SECRET'),
        })
    }

    async toUploadCloudinary(file: Express.Multer.File, folder: string, fileName: string): Promise<FilePath> {

        const buffer: Buffer = file.buffer ?? await fs.readFile(file.path);

        if (!buffer || buffer.length === 0) {
            throw new ForbiddenException("File buffer missing");
        }

        const isImage = file.mimetype.startsWith("image/");
        const resource_type = isImage ? "image" : "raw";  //we can use here auto if media type(image/video)
        const ext = isImage ? "" : path.extname(file.originalname);
        const publicId = `${generateUnique()}${ext}`;

        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder,
                    public_id: publicId,
                    resource_type
                },
                (error, result) => {
                    if (error) return reject(new ForbiddenException(`Cloud upload failed: ${error.message}`));

                    if (!result) return reject(new ForbiddenException("Cloud upload failed: no result"));

                    if (!result?.secure_url || !result?.public_id) {
                        return reject(new ForbiddenException("Failed to upload file: secure_url or public_id missing"));
                    }

                    resolve({ secure_url: result.secure_url, public_id: result.public_id, resource_type });
                }
            );

            stream.on("error", (err) => {
                console.error("Cloudinary stream error:", err);
                reject(new ForbiddenException(`Cloud upload stream failed: ${err.message}`))
            });

            stream.end(buffer);
        });
    }

    async deleteFromCloudinary(public_id: string, resource_type: string): Promise<boolean> {
        try {
            await cloudinary.uploader.destroy(public_id, { resource_type });
            return true
        } catch (error) {
            console.log(`Failed to delete cloud file: ${error.message || error}`)
            return false;
        }
    }
}
