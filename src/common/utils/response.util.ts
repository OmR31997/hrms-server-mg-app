import { ISuccessResponse } from "@common/interfaces/payload.interface";

export const success = <T>(message: string, data: T | null = null): ISuccessResponse<T> => ({
    success: true,
    message,
    data
});
