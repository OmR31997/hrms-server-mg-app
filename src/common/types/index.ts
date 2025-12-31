import { Request } from "express";

export enum UserType {
    ADMIN = "admin",
    USER = "user",
    MANAGER = "manager",
    EMPLOYEE = "employee"
}

export interface BaseUser {
    readonly id: number,
    readonly role: UserType
}

export interface JwtPayload {
    readonly id: string,
    readonly role: UserType
}

export type ValidatedUser = BaseUser;
export type AuthenticatedUser = BaseUser;

export interface Context {
    readonly user: AuthenticatedUser
}

export interface AuthenticatedRequest extends Request {
    readonly user: AuthenticatedUser;
}