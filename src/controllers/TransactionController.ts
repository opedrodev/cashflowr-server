import { Request, Response } from 'express';
import ErrorHandler from '../helpers/ErrorHandler';
import TransactionService from '../services/TransactionService';
import { TUserId } from '../types';

class TransactionController {
    public static async getTransactions(req: Request, res: Response) {
        try {
            const { userId } = req.headers as TUserId;
            const transactions = await TransactionService.getTransactions(userId);
            res.status(200).json(transactions);
        } catch (error) {
            ErrorHandler.handle(res, error);
        }
    }

    public static async createTransaction(req: Request, res: Response) {
        try {
            const { userId } = req.headers as TUserId;
            const transaction = req.body;
            await TransactionService.createTransaction(userId, transaction);
            res.status(201).json({ message: 'Transaction created successfully' });
        } catch (error) {
            ErrorHandler.handle(res, error);
        }
    }

    public static async deleteTransaction(req: Request, res: Response) {
        try {
            const { userId } = req.headers as TUserId;
            const { id: transactionId } = req.params;
            await TransactionService.deleteTransaction(userId, transactionId);
            res.status(200).json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            ErrorHandler.handle(res, error);
        }
    }
}

export default TransactionController;
