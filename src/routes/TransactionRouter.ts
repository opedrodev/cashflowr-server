import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import TransactionMiddleware from '../middlewares/TransactionMiddleware';

class TransactionRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get(
            '/',
            TokenMiddleware.validate,
            TransactionController.getTransactions,
        );

        this.router.post(
            '/',
            TokenMiddleware.validate,
            TransactionMiddleware.validateFormat,
            TransactionController.createTransaction,
        );
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default TransactionRouter;
