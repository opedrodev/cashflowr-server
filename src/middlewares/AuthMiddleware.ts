import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import ErrorHandler from '../helpers/ErrorHandler';
import ErrorType from '../helpers/ErrorType';

class AuthMiddleware {
    public static async signUpCredentials(req: Request, res: Response, next: NextFunction) {
        const schema = z.object({
            name: z.string().min(3, ErrorType.NAME_MIN_LENGTH),
            email: z.string().email(ErrorType.EMAIL_INVALID_FORMAT),
            password: z.string().min(6, ErrorType.PASSWORD_MIN_LENGTH),
        }).strict();

        try {
            schema.parse(req.body);
            return next();
        } catch (error) {
            return ErrorHandler.handle(res, error);
        }
    }

    public static async signInCredentials(req: Request, res: Response, next: NextFunction) {
        const schema = z.object({
            email: z.string().email(ErrorType.EMAIL_INVALID_FORMAT),
            password: z.string().min(6, ErrorType.PASSWORD_MIN_LENGTH),
            rememberMe: z.boolean().optional(),
        }).strict();

        try {
            schema.parse(req.body);
            return next();
        } catch (error) {
            return ErrorHandler.handle(res, error);
        }
    }
}

export default AuthMiddleware;
