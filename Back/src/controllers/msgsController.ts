import { Request,Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../database';

class MsgsController{
    public async sendMsgs(id_Chat:number,msgText:string,json:string):Promise<any>{
        // const { id_Chat,msgText } = req.body;
        // const json = req.headers['authorization']?.substring(7);
        const user = jwt.decode(''+json) as {id:number,username:string};
        const INSERT = {id_chat:id_Chat,msgText,send_id:user.id};
        await pool.query('INSERT INTO msgs SET ?',[INSERT]);
        const msgs = await pool.query('SELECT * FROM msgs WHERE id_chat=?',[id_Chat]);
        await pool.query('UPDATE chats SET update_at=?, user1_sub=1, user2_sub=1 WHERE id=?',[msgs[msgs.length-1].create_at,id_Chat]);
        return msgs;
    }
    public async updateMsgs(req:Request,res:Response):Promise<void>{
        const { edit,id_Msg,id_Chat } = req.body;
        await pool.query('UPDATE msgs SET msgtext=? WHERE id=?',[edit,id_Msg]);
        const msgs = await pool.query('SELECT * FROM msgs WHERE id_chat=?',[id_Chat]);
        res.json({msgs});
    }
    public async deleteMsgs(id_Msg:number,id_Chat:number):Promise<any>{
        // const { id_Msg,id_Chat } = req.body;
        await pool.query('DELETE FROM msgs WHERE id=?',[id_Msg]);
        const msgs = await pool.query('SELECT * FROM msgs WHERE id_chat=?',[id_Chat]);
        // res.json({msgs});
        return msgs;
    }
}

export const msgsController = new MsgsController();