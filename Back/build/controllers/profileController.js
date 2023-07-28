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
exports.profileController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
class ProfileController {
    getProfile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const json = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.substring(7);
            const user = jsonwebtoken_1.default.decode('' + json);
            const profile = yield database_1.default.query('SELECT photo_profile FROM users WHERE id=?', [user.id]);
            res.json(profile[0]);
        });
    }
    editProfile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { photo } = req.body;
            console.log(photo);
            const json = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.substring(7);
            const user = jsonwebtoken_1.default.decode('' + json);
            yield database_1.default.query('UPDATE users SET photo_profile=? WHERE id=?', [photo, user.id]);
            const profile = yield database_1.default.query('SELECT photo_profile FROM users WHERE id=?', [user.id]);
            res.json(profile[0]);
        });
    }
}
exports.profileController = new ProfileController();
