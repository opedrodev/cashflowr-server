import { Model, Schema, model } from 'mongoose';
import { TUser } from '../types';

class UserModel {
    public readonly model: Model<TUser>;

    constructor() {
        const schema = new Schema({
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
            },
            password: {
                type: String,
                required: true,
            },
            wallet: {
                type: Object,
                default: {
                    balance: 0,
                    income: 0,
                    outcome: 0,
                    transactions: [],
                },
            },
        }, { timestamps: true });

        this.model = model<TUser>('User', schema);
    }
}

export default new UserModel().model as Model<TUser>;
