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
exports.chatsController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
class ChatsController {
    getChat(id_Chat, json) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = jsonwebtoken_1.default.decode('' + json);
            const msgs = yield database_1.default.query('SELECT * FROM msgs WHERE id_chat=?', [id_Chat]);
            const chat = yield database_1.default.query(`SELECT chats.id AS id,users.username AS username,users.photo_profile AS photo, 
        IF(chats.id_user1=${user.id}, chats.id_user2, chats.id_user1) AS id_user FROM chats JOIN users 
        ON IF(chats.id_user1=${user.id}, chats.id_user2=users.id, chats.id_user1=users.id) WHERE chats.id=?`, [id_Chat]);
            return { msgs, chat: chat[0] };
        });
    }
    getChats(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = jsonwebtoken_1.default.decode('' + json);
            const chats = yield database_1.default.query(`SELECT chats.id AS id,users.username AS username, users.photo_profile AS photo FROM chats JOIN users ON 
        IF(chats.id_user1=${user.id},chats.id_user2=users.id, chats.id_user1=users.id) WHERE 
        (chats.id_user1=${user.id} AND chats.user1_sub=1) XOR (chats.id_user2=${user.id} AND chats.user2_sub=1) ORDER BY TIMESTAMPDIFF(SECOND,update_at,NOW())`);
            return chats;
        });
    }
    searchChat(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { searchUser } = req.params;
            const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            const json = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.substring(7);
            const user = jsonwebtoken_1.default.decode('' + json);
            if (regex.test(searchUser)) {
                const search = yield database_1.default.query('SELECT id,username,photo_profile FROM users WHERE email regexp ? AND id<>?', [searchUser, user.id]);
                if (search.length == 0)
                    res.json({ operacion: "Not found" });
                else
                    res.json({ search });
            }
            else {
                const search = yield database_1.default.query('SELECT id,username,photo_profile FROM users WHERE username regexp ? AND id<>?', [searchUser, user.id]);
                if (search.length == 0)
                    res.json({ operacion: "Not found" });
                else
                    res.json({ search });
            }
        });
    }
    createChat(id, json) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id } = req.body;
            // const json = req.headers['authorization']?.substring(7);
            const user = jsonwebtoken_1.default.decode('' + json);
            let chat = yield database_1.default.query(`SELECT * FROM chats WHERE (id_user1=${user.id} AND id_user2=${id}) XOR (id_user2=${user.id} AND id_user1=${id})`);
            console.log('a');
            console.log(user);
            if (chat.length == 0) {
                const INSERT = { id_user1: user.id, id_user2: id };
                console.log('b');
                yield database_1.default.query('INSERT INTO chats SET ?', [INSERT]);
                chat = yield database_1.default.query(`SELECT * FROM chats WHERE (id_user1=${user.id} AND id_user2=${id}) XOR (id_user2=${user.id} AND id_user1=${id})`);
            }
            console.log('c');
            const id_Chat = chat[0].id;
            chat = yield database_1.default.query(`SELECT chats.id AS id,users.username AS username,users.photo_profile AS photo, 
        IF(chats.id_user1=${user.id}, chats.id_user2, chats.id_user1) AS id_user FROM chats JOIN users ON 
        IF(chats.id_user1=${user.id}, chats.id_user2=users.id, chats.id_user1=users.id) WHERE chats.id=?`, [id_Chat]);
            //verificar si tienen mensajes
            const msgs = yield database_1.default.query('SELECT * FROM msgs WHERE id_chat=?', [id_Chat]);
            return { msgs, chat: chat[0] };
        });
    }
    deleteChat(id_Chat, json) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id_Chat } = req.body;
            // const json = req.headers['authorization']?.substring(7);
            const user = jsonwebtoken_1.default.decode('' + json);
            yield database_1.default.query(`UPDATE chats SET user1_sub= IF(id_user1=${user.id}, 0, user1_sub), 
        user2_sub= IF(id_user2=${user.id}, 0, user2_sub) WHERE id=?`, [id_Chat]);
            const deleteChat = yield database_1.default.query('SELECT * FROM chats WHERE user1_sub=0 AND user2_sub=0 AND id=?', [id_Chat]);
            if (deleteChat.length > 0) {
                yield database_1.default.query('DELETE FROM chats WHERE id=?', [id_Chat]);
                yield database_1.default.query('DELETE FROM msgs WHERE id_chat=?', [id_Chat]);
            }
            // res.json({operacion:"Chat borrado"});
        });
    }
}
exports.chatsController = new ChatsController();
