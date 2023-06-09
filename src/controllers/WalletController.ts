import { Request, Response } from 'express';
import ErrorHandler from '../helpers/ErrorHandler';
import WalletService from '../services/WalletService';
import { TUserId } from '../types';

class WalletController {
    public static async getWallet(req: Request, res: Response) {
        try {
            const { userId } = req.headers as TUserId;
            const wallet = await WalletService.getWallet(userId);
            return res.status(200).json(wallet);
        } catch (error) {
            return ErrorHandler.handle(res, error);
        }
    }
}

export default WalletController;
