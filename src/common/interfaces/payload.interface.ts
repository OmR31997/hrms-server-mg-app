export interface ISuccessResponse<T = unknown> {
    success: true;
    message: string;
    data: T | null;
}

export interface IJwtPayload {
    readonly sub: string,
    readonly ref_by: "Admin" | "User";
    readonly role_id: string,
    readonly company_id?: string | null;
}
