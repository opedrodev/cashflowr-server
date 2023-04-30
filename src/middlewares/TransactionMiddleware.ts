import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import ErrorHandler from '../helpers/ErrorHandler';
import ErrorType from '../helpers/ErrorType';

class TransactionMiddleware {

    public static async validateFormat(req: Request, res: Response, next: NextFunction) {
        const schema = z.object({
            type: z.enum(['income', 'outcome']),
            description: z.string().min(3, ErrorType.DESCRIPTION_MIN_LENGTH),
            category: z.string().min(3, ErrorType.CATEGORY_MIN_LENGTH),
            value: z.number().min(0.01, ErrorType.MIN_VALUE),
        }).strict();

        try {
            schema.parse(req.body);
            return next();
        } catch (error) {
            return ErrorHandler.handle(res, error);
        }
    }

}

export default TransactionMiddleware;
