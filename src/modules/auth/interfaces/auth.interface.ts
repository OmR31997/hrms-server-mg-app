import { Types } from "mongoose";
import { IAdmin } from "src/modules/admin/interfaces/admin.inteface";
import { IUser } from "src/modules/user/interfaces/user.interface";

export interface ILogin {
    refresh_token?: string;
    access_token: string;
}

export interface IValidatedUser extends Partial<IAdmin>, Partial<IUser> {}