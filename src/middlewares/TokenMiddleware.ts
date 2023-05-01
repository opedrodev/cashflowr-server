import { NextFunction, Request, Response } from 'express';
import ErrorType from '../helpers/ErrorType';
import Token from '../helpers/Token';

class TokenMiddleware {
    public static validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.status(404).json({ message: ErrorType.TOKEN_NOT_FOUND });
            }
            const { id } = Token.verify(authorization) as { id: string };
            req.headers.userId = id;
            return next();
        } catch (error) {
            return res.status(401).json({ message: ErrorType.INVALID_TOKEN });
        }
    }
}

export default TokenMiddleware;
