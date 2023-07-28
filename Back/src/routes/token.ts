import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const validateToken = (req:Request,res:Response):void=>{
    const headerToken = req.headers['authorization'];
    if(headerToken!=undefined && headerToken.startsWith('Bearer ')){
        try{
            const bearerToken = headerToken.substring(7);
            jwt.verify(bearerToken,process.env.SECRET_KEY||'$mAM4ÑE&r5/*XQL0');
            res.json({acceso:true});
        } catch(error){
            res.status(401).json({acceso:'Token no valido'});
        }
    }
    else res.status(401).json({acceso:"Acceso Denegado"});
}

export const invalidateToken = (req:Request,res:Response):void=>{
    const headerToken = req.headers['authorization'];
    if(headerToken!=undefined && headerToken.startsWith('Bearer ')){
        try{
            const bearerToken = headerToken.substring(7);
            jwt.verify(bearerToken,process.env.SECRET_KEY||'$mAM4ÑE&r5/*XQL0');
            res.status(401).json({acceso:"Acceso Denegado"});
        } catch(error){
            res.json({acceso:true});
        }
    } 
    else res.json({acceso:true});
}

export const verifyToken = (req:Request,res:Response,next:NextFunction):void=>{
    const headerToken = req.headers['authorization'];
    if(headerToken!=undefined && headerToken.startsWith('Bearer ')){
        try{
            const bearerToken = headerToken.substring(7);
            jwt.verify(bearerToken,process.env.SECRET_KEY||'$mAM4ÑE&r5/*XQL0');
            next();
        } catch(error){
            res.status(401).json({acceso:'Token no valido'});
        }
    }
    else res.status(401).json({acceso:"Acceso Denegado"});
}