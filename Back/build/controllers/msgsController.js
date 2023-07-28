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
exports.msgsController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../database"));
class MsgsController {
    sendMsgs(id_Chat, msgText, json) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id_Chat,msgText } = req.body;
            // const json = req.headers['authorization']?.substring(7);
            const user = jsonwebtoken_1.default.decode('' + json);
            const INSERT = { id_chat: id_Chat, msgText, send_id: user.id };
            yield database_1.default.query('INSERT INTO msgs SET ?', [INSERT]);
            const msgs = yield database_1.default.query('SELECT * FROM msgs WHERE id_chat=?', [id_Chat]);
            yield database_1.default.query('UPDATE chats SET update_at=?, user1_sub=1, user2_sub=1 WHERE id=?', [msgs[msgs.length - 1].create_at, id_Chat]);
            return msgs;
        });
    }
    updateMsgs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { edit, id_Msg, id_Chat } = req.body;
            yield database_1.default.query('UPDATE msgs SET msgtext=? WHERE id=?', [edit, id_Msg]);
            const msgs = yield database_1.default.query('SELECT * FROM msgs WHERE id_chat=?', [id_Chat]);
            res.json({ msgs });
        });
    }
    deleteMsgs(id_Msg, id_Chat) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id_Msg,id_Chat } = req.body;
            yield database_1.default.query('DELETE FROM msgs WHERE id=?', [id_Msg]);
            const msgs = yield database_1.default.query('SELECT * FROM msgs WHERE id_chat=?', [id_Chat]);
            // res.json({msgs});
            return msgs;
        });
    }
}
exports.msgsController = new MsgsController();
