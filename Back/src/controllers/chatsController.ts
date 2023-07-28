import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import pool from '../database';

class ChatsController{
    public async getChat(id_Chat:number,json:string):Promise<any>{
        const user = jwt.decode(''+json) as {id:number,username:string};
        const msgs = await pool.query('SELECT * FROM msgs WHERE id_chat=?',[id_Chat]);
        const chat = await pool.query(`SELECT chats.id AS id,users.username AS username,users.photo_profile AS photo, 
        IF(chats.id_user1=${user.id}, chats.id_user2, chats.id_user1) AS id_user FROM chats JOIN users 
        ON IF(chats.id_user1=${user.id}, chats.id_user2=users.id, chats.id_user1=users.id) WHERE chats.id=?`,[id_Chat]);
        return {msgs,chat:chat[0]};
    }
    public async getChats(json:string):Promise<any>{
        const user = jwt.decode(''+json) as {id:number,username:string};
        const chats = await pool.query(`SELECT chats.id AS id,users.username AS username, users.photo_profile AS photo FROM chats JOIN users ON 
        IF(chats.id_user1=${user.id},chats.id_user2=users.id, chats.id_user1=users.id) WHERE 
        (chats.id_user1=${user.id} AND chats.user1_sub=1) XOR (chats.id_user2=${user.id} AND chats.user2_sub=1) ORDER BY TIMESTAMPDIFF(SECOND,update_at,NOW())`);
        return chats;
    }
    public async searchChat(req:Request,res:Response):Promise<void>{
        const { searchUser } = req.params;
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const json = req.headers['authorization']?.substring(7);
        const user = jwt.decode(''+json) as {id:number,username:string};
        if(regex.test(searchUser)){
            const search = await pool.query('SELECT id,username,photo_profile FROM users WHERE email regexp ? AND id<>?',[searchUser,user.id]);
            if(search.length==0) res.json({operacion:"Not found"});
            else res.json({search});
        }
        else{
            const search = await pool.query('SELECT id,username,photo_profile FROM users WHERE username regexp ? AND id<>?',[searchUser,user.id]);
            if(search.length==0) res.json({operacion:"Not found"});
            else res.json({search});
        }
    }
    public async createChat(id:number,json:string):Promise<any>{
        // const { id } = req.body;
        // const json = req.headers['authorization']?.substring(7);
        const user = jwt.decode(''+json) as {id:number,username:string};
        let chat = await pool.query(`SELECT * FROM chats WHERE (id_user1=${user.id} AND id_user2=${id}) XOR (id_user2=${user.id} AND id_user1=${id})`);
        console.log('a');
        console.log(user);
        if(chat.length==0){
            const INSERT = {id_user1:user.id,id_user2:id};
            console.log('b');
            await pool.query('INSERT INTO chats SET ?',[INSERT]);
            chat = await pool.query(`SELECT * FROM chats WHERE (id_user1=${user.id} AND id_user2=${id}) XOR (id_user2=${user.id} AND id_user1=${id})`);

        }
        console.log('c');
        const id_Chat = chat[0].id;
        chat = await pool.query(`SELECT chats.id AS id,users.username AS username,users.photo_profile AS photo, 
        IF(chats.id_user1=${user.id}, chats.id_user2, chats.id_user1) AS id_user FROM chats JOIN users ON 
        IF(chats.id_user1=${user.id}, chats.id_user2=users.id, chats.id_user1=users.id) WHERE chats.id=?`,[id_Chat]);
        //verificar si tienen mensajes
        const msgs = await pool.query('SELECT * FROM msgs WHERE id_chat=?',[id_Chat]);
        return {msgs,chat:chat[0]};
    }
    public async deleteChat(id_Chat:number,json:string):Promise<void>{
        // const { id_Chat } = req.body;
        // const json = req.headers['authorization']?.substring(7);
        const user = jwt.decode(''+json) as {id:number,username:string};
        await pool.query(`UPDATE chats SET user1_sub= IF(id_user1=${user.id}, 0, user1_sub), 
        user2_sub= IF(id_user2=${user.id}, 0, user2_sub) WHERE id=?`,[id_Chat]);
        const deleteChat = await pool.query('SELECT * FROM chats WHERE user1_sub=0 AND user2_sub=0 AND id=?',[id_Chat]);
        if(deleteChat.length>0){
            await pool.query('DELETE FROM chats WHERE id=?',[id_Chat]);
            await pool.query('DELETE FROM msgs WHERE id_chat=?',[id_Chat]);
        }
        // res.json({operacion:"Chat borrado"});
    }
}

export const chatsController = new ChatsController();