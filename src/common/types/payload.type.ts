import { Request } from "express";

export type JwtRequestPayload = {
    readonly sub: string,
    readonly ref_by: "Admin" | "User";
    readonly role_id: string,
    readonly company_id?: string | null
}

export type FilePayload = {
  document: Express.Multer.File
}

export type UploadedFileResult = {
  secure_url: string;
  public_id: string | null;
} | null;

export type UploadedRequest = Express.Multer.File;