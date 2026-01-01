import { ENV } from "@config/env.config";
import multer, { diskStorage, FileFilterCallback, Options as MulterOptions } from "multer";
import fs from "fs";
import path from "path";
import { BadRequestException } from "@nestjs/common";

const generateUniqueName = (prefix = "", originalname: string = ""): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);

    if (ENV.IS_PROD) {
        return `${prefix}${timestamp}${random}`
    } else {
        const ext = path.extname(originalname);
        return `${prefix}${timestamp}${random}${ext}`;
    }
}

export type NestMulterOptions = MulterOptions;

const uploadPath = path.join("public", "uploads");

if (!ENV.IS_PROD && !fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const createFileFilter = (allowedFieldName: string) => {
    return (req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback) => {
        if (file.fieldname === allowedFieldName) {
            callback(null, true);
        } else {
            callback(new BadRequestException(`Invalid field name. Expected '${allowedFieldName}'`))
        }
    }
}

export const multerConfig = (prefix = "", allowedFieldName = "document"): NestMulterOptions => {
    if (ENV.IS_PROD) {
        return {
            storage: multer.memoryStorage(),
            fileFilter: createFileFilter(allowedFieldName)
        }
    }

    const storage = diskStorage({
        destination: (_req: Express.Request, _file: Express.Multer.File, callback) => {
            callback(null, uploadPath);
        },
        filename: (_req: Express.Request, file: Express.Multer.File, callback) => {
            callback(null, generateUniqueName(prefix, file.originalname))
        }
    });

    return {
        storage,
        fileFilter: createFileFilter(allowedFieldName)
    }

}