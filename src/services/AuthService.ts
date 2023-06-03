import CustomError from '../helpers/CustomError';
import Password from '../helpers/Password';
import Token from '../helpers/Token';
import UserModel from '../models/UserModel';
import { TSignIn, TUser, UserDocument } from '../types';

class AuthService {
    public static async signUp(user: TUser) {
        await this.checkIfUserAlreadyExists(user.email);
        const { password, ...info } = user;
        await UserModel.create({ ...info, password: Password.hash(password) });
    }

    public static async signIn(user: TSignIn): Promise<string> {
        const registered = await this.findUserRegisteredByEmail(user.email);
        this.validateUserPassword(user.password, registered.password);
        return Token.create(registered._id.toString(), user.rememberMe);
    }

    private static async checkIfUserAlreadyExists(email: string) {
        const user = await UserModel.findOne({ email });
        if (user) throw new CustomError('User already exists', 409);
    }

    private static async findUserRegisteredByEmail(email: string): Promise<UserDocument> {
        const user = await UserModel.findOne({ email });
        if (!user) throw new CustomError('User does not exist', 404);
        return user;
    }

    private static validateUserPassword(password: string, hashedPassword: string) {
        const passwordMatch = Password.compare(password, hashedPassword);
        if (!passwordMatch) throw new CustomError('Invalid credentials', 401);
    }
}

export default AuthService;
