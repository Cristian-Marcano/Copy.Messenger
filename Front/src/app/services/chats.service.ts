import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { barChats } from '../models/barChats';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { chatMsgs } from '../models/chatMsgs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { searchUser } from '../models/searchUser';

@Injectable({
  providedIn: 'root'
})
export class ChatsService{
  private jwt:string='';
  public showChat:number=0;
  constructor(private socket:Socket,private http:HttpClient,private peticionesAuth:AuthService,private router:Router) {}
  searchUser(search:string):Observable<{search:searchUser[],operacion:string}>{
    this.showChat=0;
    return this.http.get<{search:searchUser[],operacion:string}>('http://localhost:4004/Api/chats/search/'+search);
  }
  createChat(id:number):void{
    const x:string|null = localStorage.getItem('token');
    (x) ? this.jwt = x: this.jwt = '';
    this.socket.emit('create',{id,jwt:this.jwt});
  }
  getChats():Observable<barChats[]>{
    const x:string|null = localStorage.getItem('token');
    (x) ? this.jwt = x: this.jwt = '';
    this.peticionesAuth.validateToken().subscribe({
      next:()=> this.socket.emit('chats',{jwt:this.jwt}),
      error:(err:HttpErrorResponse)=> this.router.navigate(['/sign'])
    });
    return this.socket.fromEvent<barChats[]>('chats');
  }
  sendIdToGetChat(id:number):void{
    const x:string|null = localStorage.getItem('token');
    (x) ? this.jwt = x: this.jwt = '';
    this.showChat=0;
    this.socket.emit('chat',{id,jwt:this.jwt});
  }
  deleteChat(id_chat:number):void{
    const x:string|null = localStorage.getItem('token');
    (x) ? this.jwt = x: this.jwt = '';
    this.showChat=id_chat;
    this.socket.emit('delete-chat',{id_chat,jwt:this.jwt});
  }
  getChat():Observable<{chat:barChats,msgs:chatMsgs[]}>{
    return this.socket.fromEvent<{chat:barChats,msgs:chatMsgs[]}>('chat');
  }
  sendMsg(msg:string,id_chat:number):void{
    const x:string|null = localStorage.getItem('token');
    (x) ? this.jwt = x: this.jwt = '';
    this.socket.emit('msg',{msg,id_chat,jwt:this.jwt});
  }
  deleteMsg(id_msg:number,id_chat:number):void{
    const x:string|null = localStorage.getItem('token');
    (x) ? this.jwt = x: this.jwt = '';
    this.socket.emit('delete-msg',{id_msg,id_chat,jwt:this.jwt});
  }
  getMsgs():Observable<chatMsgs[]>{
    return this.socket.fromEvent<chatMsgs[]>('msgs');
  }
}