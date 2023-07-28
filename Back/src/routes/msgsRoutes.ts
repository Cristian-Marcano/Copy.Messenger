import { Router } from 'express';
import { msgsController } from '../controllers/msgsController';
import { validateToken } from './token';

class MsgsRoutes{
    public router:Router = Router();
    constructor() {
        this.send();
        this.update();
        this.delete();
    }
    send():void{
        // this.router.post('/send',validateToken,msgsController.sendMsgs);
    }
    update():void{
        this.router.put('/update',validateToken,msgsController.updateMsgs);
    }
    delete():void{}
}

const msgsRoutes = new MsgsRoutes();
export default msgsRoutes.router;