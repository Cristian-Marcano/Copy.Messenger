import { Router } from 'express';
import { profileController } from '../controllers/profileController';
import { verifyToken } from './token';

class ProfileRoutes{
    public router:Router = Router();
    constructor() {
        this.get();
        this.update();
    }
    get():void{
        this.router.get('/',verifyToken,profileController.getProfile);
    }
    update():void{
        this.router.put('/update',verifyToken,profileController.editProfile);
    }
}

const profileRoutes = new ProfileRoutes();
export default profileRoutes.router;