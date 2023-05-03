import { v4 } from 'uuid';
import CustomError from '../helpers/CustomError';
import Wallet from '../helpers/Wallet';
import UserModel from '../models/UserModel';
import { TTransaction, TUser, TWallet } from '../types';

class TransactionService {
    public static async getTransactions(id: string) {
        const user = await UserModel.findById(id);
        if (!user) throw new CustomError('User not found', 404);
        const { wallet: { transactions } } = user as TUser;
        return transactions;
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

    public static async deleteTransaction(userId: string, transactionId: string) {
        const user = await this.findUserById(userId);
        const transactionIndex = this.findTransactionIndexById(transactionId, user.wallet);
        user.wallet.transactions.splice(transactionIndex, 1);
        user.markModified('wallet.transactions');
        await user.save();
        await Wallet.update(userId);
    }

    private static async findUserById(id: string) {
        const user = await UserModel.findById(id);
        if (!user) throw new CustomError('User not found', 404);
        return user;
    }

    private static findTransactionIndexById(id: string, wallet: TWallet) {
        const { transactions } = wallet;
        const transactionIndex = transactions.findIndex((t) => t.id === id);
        if (transactionIndex === -1) throw new CustomError('Transaction not found', 404);
        return transactionIndex;
    }
}

export default TransactionService;
