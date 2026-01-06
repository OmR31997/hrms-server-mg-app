export type JwtRequestPayload = {
    readonly sub: string,
    readonly ref_by: "Admin" | "User";
    readonly role_id: string,
    readonly company_id?: string | null
}

export type FilePayload = {
  document?: Express.Multer.File | null
}

export type FilePath = {
  secure_url: string;
  public_id: string | null;
  resource_type: "image" | "raw" | "auto"
} | null;

export type UploadedRequest = Express.Multer.File;