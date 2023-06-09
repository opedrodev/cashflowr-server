import { Router } from 'express';
import WalletController from '../controllers/WalletController';
import TokenMiddleware from '../middlewares/TokenMiddleware';

class WalletRouter {
    private router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get('/', TokenMiddleware.validate, WalletController.getWallet);
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default WalletRouter;
