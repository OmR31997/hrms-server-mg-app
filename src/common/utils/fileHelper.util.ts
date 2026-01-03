import * as fs from "fs/promises";
import * as path from "path";
import crypto from "crypto";
import { ForbiddenException } from "@nestjs/common";
import { ENV } from "@config/env.config";

export const deleteLocalFile = async (filePath: string) => {
    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code === "ENOENT") return;

        throw new ForbiddenException(`Error deleting file`)
    }
}

export const validateFile = async (
    file: Express.Multer.File,
    allowedTypes: string[],
    {
        maxSizeMB = null, maxSizeKB = null
    }: { maxSizeMB?: number | null; maxSizeKB?: number | null } = {}): Promise<boolean> => {

    let maxBytes: number = 0;
    let readLimit: string = "";

    if (maxSizeKB !== null) {
        maxBytes = 1024 * maxSizeKB;
        readLimit = `${maxSizeKB} KB`
    } else if (maxSizeMB !== null) {
        maxBytes = 1024 * 1024 * maxSizeMB;
        readLimit = `${maxSizeMB} MB`
    } else {
        maxBytes = 1024 * 1024;
        readLimit = "1 MB";
    }


    try {
        if (!allowedTypes.includes(file.mimetype)) {
            throw new ForbiddenException(`Invalid file type for '${file.originalname}'`)
        }

        if (file.size > maxBytes) {
            throw new ForbiddenException(`File '${file.originalname}' exceeds ${readLimit} limit`)
        }

        return true;

    } catch (error) {
        if (!ENV.IS_PROD && file.path) {
            await deleteLocalFile(file.path)
        }

        throw new ForbiddenException("Invalid files");
    }
}

export const saveFileLocally = async (file: Express.Multer.File): Promise<string> => {

    const uploadDir = path.join(process.cwd(), "uploads/documents");

    try {
        await fs.access(uploadDir);
    } catch (error) {
        await fs.mkdir(uploadDir, { recursive: true })
    }

    const fileName = crypto.randomBytes(32).toString("hex");
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, file.buffer);

    return `/uploads/documents/${fileName}`;
}