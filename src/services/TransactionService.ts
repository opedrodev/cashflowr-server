import { v4 } from 'uuid';
import CustomError from '../helpers/CustomError';
import Wallet from '../helpers/Wallet';
import UserModel from '../models/UserModel';
import { TTransaction, TWallet, UserDocument } from '../types';

class TransactionService {
    public static async getTransactions(id: string): Promise<TTransaction[]> {
        const user = await this.findUserById(id);
        const { wallet: { transactions } } = user;
        return transactions;
    }

    public static async createTransaction(id: string, transaction: TTransaction) {
        const user = await this.findUserById(id);
        const { wallet: { transactions } } = user;
        transactions.push({ id: v4(), ...transaction, date: new Date() });
        user.markModified('wallet.transactions');
        await user.save();
        await Wallet.update(id);
    }

    public static async deleteTransaction(userId: string, transactionId: string) {
        const user = await this.findUserById(userId);
        const transactionIndex = this.findTransactionIndexById(transactionId, user.wallet);
        user.wallet.transactions.splice(transactionIndex, 1);
        user.markModified('wallet.transactions');
        await user.save();
        await Wallet.update(userId);
    }

    public static async updateTransaction(
        userId: string,
        transactionId: string,
        transaction: TTransaction,
    ) {
        const user = await this.findUserById(userId);
        const transactionIndex = this.findTransactionIndexById(transactionId, user.wallet);
        user.wallet.transactions[transactionIndex] = {
            id: transactionId, ...transaction, date: new Date(),
        };
        user.markModified('wallet.transactions');
        await user.save();
        await Wallet.update(userId);
    }

    private static async findUserById(id: string): Promise<UserDocument> {
        const user = await UserModel.findById(id);
        if (!user) throw new CustomError('User not found', 404);
        return user;
    }

    private static findTransactionIndexById(id: string, wallet: TWallet): number {
        const { transactions } = wallet;
        const transactionIndex = transactions.findIndex((t) => t.id === id);
        if (transactionIndex === -1) throw new CustomError('Transaction not found', 404);
        return transactionIndex;
    }
}

export default TransactionService;
