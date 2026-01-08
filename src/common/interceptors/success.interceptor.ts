import { ISuccessResponse } from "@common/interfaces/payload.interface";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export type ApiResponse<T = unknown> = {
    message?: string,
    data: T | null
}

@Injectable()
export class SuccessInterceptor implements NestInterceptor<ISuccessResponse> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ISuccessResponse> {
        return next
            .handle()
            .pipe(
                map((response: ApiResponse) => {
                    const { message, data } = response ?? {};

                    return {
                        success: true,
                        message: message ?? "Data fetched successfully",
                        data: data,
                        timestamp: new Date().toISOString()
                    }
                })
            )
    }
}