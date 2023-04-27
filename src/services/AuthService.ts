import CustomError from '../helpers/CustomError';
import Password from '../helpers/Password';
import UserModel from '../models/UserModel';
import { TUser } from '../types';

class AuthService {

    public static async signUp(user: TUser) {
        const userExists = await UserModel.findOne({ email: user.email });
        if (userExists) throw new CustomError('User already exists', 409);
        const { password, ...info } = user;
        await UserModel.create({ ...info, password: Password.hash(password) });
    }

}

export default AuthService;
