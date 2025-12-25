export interface SuccessResponse<T = unknown> {
    success: true;
    message: string;
    data: T | null;
}

export const success = <T>(message: string, data: T | null = null): SuccessResponse<T> => ({
    success: true,
    message,
    data
});


export interface ErrorResponse<T = unknown> {
    success: false;
    message: string;
    errors: [string];
} 