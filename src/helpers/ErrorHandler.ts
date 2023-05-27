import { Response } from 'express';
import { ZodError } from 'zod';
import CustomError from './CustomError';

class ErrorHandler {
    public static handle(res: Response, error: unknown) {
        if (error instanceof ZodError) {
            const { message } = error.errors[0];
            return res.status(422).json({ message });
        }

        if (error instanceof CustomError) {
            const { message, status } = error as CustomError;
            return res.status(status).json({ message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default ErrorHandler;
