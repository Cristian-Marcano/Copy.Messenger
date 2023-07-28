import express, { Application } from 'express';
import http, { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import chatsRoutes from './routes/chatsRoutes';
import profileRoutes from './routes/profileRoutes';
import { chatsController } from './controllers/chatsController';
import { msgsController } from './controllers/msgsController';
import { verifyToken } from './routes/token';

class API_REST{
    private app:Application;
    private server:HTTPServer;
    public io:Server;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server,{
            cors:{
                origin: ['http://localhost:4200','https://kit.fontawesome.com/5820292e2c.js'], // Coloca aquí el origen permitido
                credentials: true // Si necesitas enviar cookies o encabezados de autenticación
            }
        });
        this.connectionWS();
    }
    config():void{
        this.app.set('port',process.env.PORT||4004);
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json());
    }
    routes():void{
        this.app.use('/Api/auth',authRoutes);
        this.app.use('/Api/chats',chatsRoutes);
        this.app.use('/Api/profile',profileRoutes);
    }
    connectionWS():void{
        this.io.on('connection',(socket:Socket)=>{
            socket.on('chats',async(data)=>{
                const chats = await chatsController.getChats(data.jwt);
                socket.emit('chats',chats);
            });
            socket.on('chat',async(data)=>{
                const chat = await chatsController.getChat(data.id,data.jwt);
                socket.emit('chat',chat);
            });
            socket.on('msg',async(data)=>{
                const msgs = await msgsController.sendMsgs(data.id_chat,data.msg,data.jwt);
                this.io.emit('msgs',msgs);
            });
            socket.on('create',async(data)=>{
                const chat = await chatsController.createChat(data.id,data.jwt);
                socket.emit('chat',chat);
            });
            socket.on('delete-msg',async(data)=>{
                const msgs = await msgsController.deleteMsgs(data.id_msg,data.id_chat)
                this.io.emit('msgs',msgs);
            });
            socket.on('delete-chat',async(data)=>{
                await chatsController.deleteChat(data.id_chat,data.jwt);
                const chats = await chatsController.getChats(data.jwt);
                socket.emit('chats',chats);
            });
        });
    }
    start():void{
        this.server.listen(this.app.get('port'),()=>console.log('Server on Port',this.app.get('port')));
    }
}

const server = new API_REST();
server.start();