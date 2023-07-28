"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.invalidateToken = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.substring(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || '$mAM4ÑE&r5/*XQL0');
            res.json({ acceso: true });
        }
        catch (error) {
            res.status(401).json({ acceso: 'Token no valido' });
        }
    }
    else
        res.status(401).json({ acceso: "Acceso Denegado" });
};
exports.validateToken = validateToken;
const invalidateToken = (req, res) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.substring(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || '$mAM4ÑE&r5/*XQL0');
            res.status(401).json({ acceso: "Acceso Denegado" });
        }
        catch (error) {
            res.json({ acceso: true });
        }
    }
    else
        res.json({ acceso: true });
};
exports.invalidateToken = invalidateToken;
const verifyToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.substring(7);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || '$mAM4ÑE&r5/*XQL0');
            next();
        }
        catch (error) {
            res.status(401).json({ acceso: 'Token no valido' });
        }
    }
    else
        res.status(401).json({ acceso: "Acceso Denegado" });
};
exports.verifyToken = verifyToken;
