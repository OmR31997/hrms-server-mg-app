import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Something went wrong";
        let errors: null | Object = null;

        if(exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if(typeof exceptionResponse === "object") {
                message = exceptionResponse["message"] || message;
                errors = exceptionResponse["errors"] || errors;
            } else {
                message = exceptionResponse || message;
            }
        } else if(exception instanceof Error) {
            message = exception.message;
        }

        // Check if it is a CastError
        if((exception as any).name === "CastError") {
            message = `Invalid ID format for field '${(exception as any).path}'`;
            status = HttpStatus.BAD_REQUEST;
        }

        // Handle MongoDB Validation errors
        if((exception as any).name === "ValidationError") {
            const validationErrors = (exception as any).errors;
            const errorDetails = {};
     
            for(const key in validationErrors) {
                errorDetails[key] = validationErrors[key].message;
            }

            message = "Validation failed";
            errors = errorDetails;
            status = HttpStatus.BAD_REQUEST;
        }

        // Handle MongoServerError (duplicate keys or database errors)
        if((exception as any).code === 11000) {
            const keyValue = (exception as any).keyValue;
            const field = keyValue ? Object.keys(keyValue)[0] : "Field"; 
            message = `${field} already exists`;
            status = HttpStatus.CONFLICT;
        }

        // Send the response
        response.status(status).json({
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString(),
            path: request.url,
        })
    }
}