import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import AuthRouter from './routes/AuthRouter';
import TransactionRouter from './routes/TransactionRouter';
import WalletRouter from './routes/WalletRouter';

dotenv.config();

class App {
    public readonly app: Application;

    constructor() {
        this.app = express();

        App.database();
        this.middlewares();
        this.routes();
    }

    private static database() {
        mongoose.connect(
            process.env.MONGODB_URL || 'mongodb://database:27017/cashflowr',
            { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions,
        );
    }

    private middlewares() {
        this.app.use(express.json());
    }

    private routes() {
        this.app.get('/health', (_req, res) => res.status(200).json({ message: 'OK' }));
        this.app.use('/auth', new AuthRouter().getRoutes());
        this.app.use('/transactions', new TransactionRouter().getRoutes());
        this.app.use('/wallet', new WalletRouter().getRoutes());
    }
}

export default App;
