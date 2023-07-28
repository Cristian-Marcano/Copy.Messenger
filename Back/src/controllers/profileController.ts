import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import pool from "../database";

class ProfileController{
    public async getProfile(req:Request,res:Response):Promise<void>{
        const json = req.headers['authorization']?.substring(7);
        const user = jwt.decode(''+json) as {id:number,username:string};
        const profile = await pool.query('SELECT photo_profile FROM users WHERE id=?',[user.id]);
        res.json(profile[0]);
    }
    public async editProfile(req:Request,res:Response):Promise<void>{
        const { photo } = req.body;
        console.log(photo);
        const json = req.headers['authorization']?.substring(7);
        const user = jwt.decode(''+json) as {id:number,username:string};
        await pool.query('UPDATE users SET photo_profile=? WHERE id=?',[photo,user.id]);
        const profile = await pool.query('SELECT photo_profile FROM users WHERE id=?',[user.id]);
        res.json(profile[0]);
    }
}

export const profileController = new ProfileController();