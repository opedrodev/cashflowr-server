import { Request, Response } from 'express';
import ErrorHandler from '../helpers/ErrorHandler';
import TransactionService from '../services/TransactionService';

class TransactionController {
    public static async getTransactions(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const transactions = await TransactionService.getTransactions(id);
            res.status(200).json(transactions);
        } catch (error) {
            ErrorHandler.handle(res, error);
        }
    }

    public static async createTransaction(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const transaction = req.body;
            await TransactionService.createTransaction(id, transaction);
            res.status(201).json({ message: 'Transaction created successfully' });
        } catch (error) {
            ErrorHandler.handle(res, error);
        }
    }
}

export default TransactionController;
