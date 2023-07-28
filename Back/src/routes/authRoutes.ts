import { Router } from 'express';
import { authController } from '../controllers/authController';
import { invalidateToken,validateToken } from './token';

class AuthRoutes{
    public router:Router = Router();
    constructor(){
        this.signUp();
        this.logIn();
        this.token();
    }
    signUp():void{
        this.router.post('/signup',authController.signUp);
    }
    logIn():void{
        this.router.post('/login',authController.logIn);
    }
    token():void{
        this.router.get('/validate',validateToken);
        this.router.get('/invalidate',invalidateToken);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;