import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database';

class AuthController{
    public async signUp(req:Request,res:Response):Promise<void>{
        const { email,password,username } = req.body;
        const rEmails = await pool.query('SELECT * FROM users WHERE email=?',[email]);
        if(rEmails.length==0){
            const rUsers = await pool.query('SELECT * FROM users WHERE username=?',[username]);
            if(rUsers.length>0) res.status(400).json({operacion:"El Username ya existe, inserte otro"});
            else{
                const hashedPassword = await bcrypt.hash(password,10);
                const user = { email,password:hashedPassword,username };
                await pool.query('INSERT INTO users SET ?',[user]);
                const rUser = await pool.query('SELECT * FROM users WHERE email=?',[email]);
                const token = jwt.sign({username,id:rUser[0].id},process.env.SECRET_KEY||'$mAM4ÑE&r5/*XQL0',{expiresIn:360000});
                res.json({token});
            }
        }
        else res.status(400).json({operacion:"El email que inserto ya se encuentra registrado"});
    }
    public async logIn(req:Request,res:Response):Promise<void>{
        const { username,password } = req.body;
        const rUser = await pool.query('SELECT * FROM users WHERE username=?',[username]);
        if(rUser.length==0) res.status(400).json({operacion:"No existe una cuenta con ese username"});
        else if(await bcrypt.compare(password,rUser[0].password)){
            const token = jwt.sign({username,id:rUser[0].id},process.env.SECRET_KEY||'$mAM4ÑE&r5/*XQL0',{expiresIn:360000});
            res.json({token});
        }
        else res.status(400).json({operacion:"Password invalida"});
    }
}

export const authController = new AuthController();