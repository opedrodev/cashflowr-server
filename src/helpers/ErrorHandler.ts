import { Response } from 'express';
import CustomError from './CustomError';

class ErrorHandler {

    public static handle(res: Response, error: unknown, statusCode?: number) {
        if (error instanceof Error) {
            const { message } = error;
            return res.status(statusCode || 400).json({ message });
        }

        if (error instanceof CustomError) {
            const { message, status } = error as CustomError;
            return res.status(status).json({ message });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }

}

export default ErrorHandler;
