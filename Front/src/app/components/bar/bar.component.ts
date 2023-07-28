import { Component } from '@angular/core';
import { barChats } from 'src/app/models/barChats';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {
  cancel:boolean=false;
  array:barChats[]=[];
  constructor(private peticionesChats:ChatsService) {
    this.peticionesChats.getChats().subscribe(data=> this.array=data);
  }
  showChat(id:number):void{
    this.peticionesChats.sendIdToGetChat(id);
  }
  deleteChat(id:number):void{
    this.peticionesChats.deleteChat(id);
  }
}