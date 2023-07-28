"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
class AuthController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, username } = req.body;
            const rEmails = yield database_1.default.query('SELECT * FROM users WHERE email=?', [email]);
            if (rEmails.length == 0) {
                const rUsers = yield database_1.default.query('SELECT * FROM users WHERE username=?', [username]);
                if (rUsers.length > 0)
                    res.status(400).json({ operacion: "El Username ya existe, inserte otro" });
                else {
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const user = { email, password: hashedPassword, username };
                    yield database_1.default.query('INSERT INTO users SET ?', [user]);
                    const rUser = yield database_1.default.query('SELECT * FROM users WHERE email=?', [email]);
                    const token = jsonwebtoken_1.default.sign({ username, id: rUser[0].id }, process.env.SECRET_KEY || '$mAM4ÑE&r5/*XQL0', { expiresIn: 360000 });
                    res.json({ token });
                }
            }
            else
                res.status(400).json({ operacion: "El email que inserto ya se encuentra registrado" });
        });
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const rUser = yield database_1.default.query('SELECT * FROM users WHERE username=?', [username]);
            if (rUser.length == 0)
                res.status(400).json({ operacion: "No existe una cuenta con ese username" });
            else if (yield bcrypt_1.default.compare(password, rUser[0].password)) {
                const token = jsonwebtoken_1.default.sign({ username, id: rUser[0].id }, process.env.SECRET_KEY || '$mAM4ÑE&r5/*XQL0', { expiresIn: 360000 });
                res.json({ token });
            }
            else
                res.status(400).json({ operacion: "Password invalida" });
        });
    }
}
exports.authController = new AuthController();
