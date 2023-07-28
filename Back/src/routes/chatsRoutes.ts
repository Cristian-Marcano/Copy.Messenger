import { Router } from 'express';
import { chatsController } from '../controllers/chatsController';
import { verifyToken } from './token';

class ChatsRoutes{
    public router:Router = Router();
    constructor() {
        this.search();
    }
    search():void{ 
        this.router.get('/search/:searchUser',verifyToken,chatsController.searchChat); 
    }
}

const chatsRoutes = new ChatsRoutes();
export default chatsRoutes.router;