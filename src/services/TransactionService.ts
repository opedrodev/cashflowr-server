import { v4 } from 'uuid';
import CustomError from '../helpers/CustomError';
import UserModel from '../models/UserModel';
import { TTransaction, TUser } from '../types';

class TransactionService {
    public static async getTransactions(id: string) {
        try {
            const { wallet: { transactions } } = await UserModel.findById(id) as TUser;
            return transactions;
        } catch (error) {
            throw new CustomError('User not found', 404);
        }
    }

    public static async createTransaction(id: string, transaction: TTransaction) {
        const user = await UserModel.findByIdAndUpdate(
            id,
            {
                $push: { 'wallet.transactions': { id: v4(), ...transaction, date: new Date() } },
                $inc: {
                    'wallet.balance': transaction.type === 'income' ? transaction.value : -transaction.value,
                    'wallet.income': transaction.type === 'income' ? transaction.value : 0,
                    'wallet.outcome': transaction.type === 'outcome' ? transaction.value : 0,
                },
            },
            { new: true },
        );

        if (!user) throw new CustomError('User not found', 404);
    }
}

export default TransactionService;
