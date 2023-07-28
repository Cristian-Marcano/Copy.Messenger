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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const chatsRoutes_1 = __importDefault(require("./routes/chatsRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const chatsController_1 = require("./controllers/chatsController");
const msgsController_1 = require("./controllers/msgsController");
class API_REST {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: ['http://localhost:4200', 'https://kit.fontawesome.com/5820292e2c.js'],
                credentials: true // Si necesitas enviar cookies o encabezados de autenticación
            }
        });
        this.connectionWS();
    }
    config() {
        this.app.set('port', process.env.PORT || 4004);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/Api/auth', authRoutes_1.default);
        this.app.use('/Api/chats', chatsRoutes_1.default);
        this.app.use('/Api/profile', profileRoutes_1.default);
    }
    connectionWS() {
        this.io.on('connection', (socket) => {
            socket.on('chats', (data) => __awaiter(this, void 0, void 0, function* () {
                const chats = yield chatsController_1.chatsController.getChats(data.jwt);
                socket.emit('chats', chats);
            }));
            socket.on('chat', (data) => __awaiter(this, void 0, void 0, function* () {
                const chat = yield chatsController_1.chatsController.getChat(data.id, data.jwt);
                socket.emit('chat', chat);
            }));
            socket.on('msg', (data) => __awaiter(this, void 0, void 0, function* () {
                const msgs = yield msgsController_1.msgsController.sendMsgs(data.id_chat, data.msg, data.jwt);
                this.io.emit('msgs', msgs);
            }));
            socket.on('create', (data) => __awaiter(this, void 0, void 0, function* () {
                const chat = yield chatsController_1.chatsController.createChat(data.id, data.jwt);
                socket.emit('chat', chat);
            }));
            socket.on('delete-msg', (data) => __awaiter(this, void 0, void 0, function* () {
                const msgs = yield msgsController_1.msgsController.deleteMsgs(data.id_msg, data.id_chat);
                this.io.emit('msgs', msgs);
            }));
            socket.on('delete-chat', (data) => __awaiter(this, void 0, void 0, function* () {
                yield chatsController_1.chatsController.deleteChat(data.id_chat, data.jwt);
                const chats = yield chatsController_1.chatsController.getChats(data.jwt);
                socket.emit('chats', chats);
            }));
        });
    }
    start() {
        this.server.listen(this.app.get('port'), () => console.log('Server on Port', this.app.get('port')));
    }
}
const server = new API_REST();
server.start();
