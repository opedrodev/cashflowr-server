import { Request, Response } from 'express';
import ErrorHandler from '../helpers/ErrorHandler';
import AuthService from '../services/AuthService';

class AuthController {

    public static async signUp(req: Request, res: Response) {
        try {
            await AuthService.signUp(req.body);
            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            return ErrorHandler.handle(res, error);
        }
    }

    public static async signIn(req: Request, res: Response) {
        try {
            const token = await AuthService.signIn(req.body);
            return res.status(200).json({ token });
        } catch (error) {
            return ErrorHandler.handle(res, error);
        }
    }

}

export default AuthController;
