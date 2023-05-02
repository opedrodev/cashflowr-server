import UserModel from '../models/UserModel';
import { TUser, TWallet } from '../types';
import CustomError from './CustomError';

class Wallet {
    public static async update(userId: string) {
        const user = await UserModel.findById(userId);
        if (!user) throw new CustomError('User not found', 404);
        const { wallet } = user as TUser;
        user.wallet = this.calculateWallet(wallet);
        await user.save();
    }

    private static calculateWallet(wallet: TWallet): TWallet {
        const balance = wallet.transactions.reduce((acc, transaction) => {
            if (transaction.type === 'income') return acc + transaction.value;
            return acc - transaction.value;
        }, 0);

        const income = wallet.transactions.reduce((acc, transaction) => {
            if (transaction.type === 'income') return acc + transaction.value;
            return acc;
        }, 0);

        const outcome = wallet.transactions.reduce((acc, transaction) => {
            if (transaction.type === 'outcome') return acc + transaction.value;
            return acc;
        }, 0);

        return {
            ...wallet, balance, income, outcome,
        };
    }
}

export default Wallet;
