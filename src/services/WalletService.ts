import UserModel from '../models/UserModel';

class WalletService {
    public static async getWallet(userId: string) {
        const wallet = await UserModel.findById(userId, { wallet: 1, _id: 0 });
        return wallet;
    }
}

export default WalletService;
