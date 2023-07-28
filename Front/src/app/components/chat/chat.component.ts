import { Component } from '@angular/core';
import { barChats } from 'src/app/models/barChats';
import { chatMsgs } from 'src/app/models/chatMsgs';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
  mensaje:string='';
  chatUser:barChats={id:0,username:'',photo:'',id_user:0};
  msgs:chatMsgs[]=[];
  deleteMsgs:number=0;
  constructor(private peticionesChat:ChatsService){
    this.peticionesChat.getChat().subscribe(data=>{
      this.chatUser = data.chat;
      this.msgs = data.msgs;
      this.mensaje='';
      this.deleteMsgs=0;
    });
    this.peticionesChat.getMsgs().subscribe(data=>{
      if(data[0].id_chat==this.chatUser.id) this.msgs = data;
      this.peticionesChat.getChats();
    });
  }
  quitChat():void{
    this.peticionesChat.showChat=0;
    this.chatUser={id:0,username:'',photo:'',id_user:0};
    this.msgs=[];
  }
  verifLength():boolean{
    const regex = /^\s*$/;
    if(regex.test(this.mensaje)) return false;
    else return true;
  }
  sendMsgs():void{
    if(this.mensaje!='') this.peticionesChat.sendMsg(this.mensaje,this.chatUser.id);
    this.mensaje='';
  }
  verifUser(event:MouseEvent,id_send:number,idMsgs:number):void{
    event.preventDefault();
    if(id_send!=this.chatUser.id_user) this.deleteMsgs=idMsgs;
  }
  deleteMsg(id_msg:number,id_chat:number):void{
    this.peticionesChat.deleteMsg(id_msg,id_chat);
  }
  selectDelete():boolean{
    if(this.chatUser.id==this.peticionesChat.showChat){
      this.chatUser={id:0,username:'',photo:'',id_user:0};
      this.msgs=[];
      return false;
    } 
    return true;
  }
}
