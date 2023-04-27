import { Router } from 'express';
import AuthController from '../controllers/AuthController';

class AuthRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post('/signup', AuthController.signUp);
    }

    public getRoutes() {
        return this.router;
    }

}

export default AuthRouter;
