import { Request, Response, NextFunction } from 'express';
import { unknown } from 'zod';
import { ZodError } from 'zod';

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('API Error:', err);
    let statusCode = err.status || 500;
    let message = err.message || 'Internal Server Error';
    let errors: any[] = [];

    if (err instanceof ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errors = err.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
        }));
    }

    res.status(statusCode).json({
        message,
        errors,
    });
};
