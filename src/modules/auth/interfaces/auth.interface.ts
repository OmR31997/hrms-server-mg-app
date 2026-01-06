import { IAdmin } from "@module/admin/interfaces/admin.inteface";
import { IUser } from "@module/user/interfaces/user.interface";

export interface IValidatedUser extends Partial<IAdmin>, Partial<IUser> {
    ref_by: string;
}

export interface IToken {
    access_token: string
    refresh_token?: string
}

export interface IOtp {
    otp: number;
}