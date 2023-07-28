import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { searchUser } from 'src/app/models/searchUser';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  operacion:string='';
  arraySearch:searchUser[]=[];
  Search:string='';
  classIcon:string='fa-solid fa-magnifying-glass search-icono';
  constructor(private router:Router,private peticionesChats:ChatsService) {}
  createChat(id:number):void{
    this.peticionesChats.createChat(id);
    this.Search='';
    this.arraySearch=[];
    this.pressIcon();
  }
  getSearch():void{
    this.arraySearch=[];
    this.operacion='';
    if(this.Search!='') this.peticionesChats.searchUser(this.Search).subscribe({
      next:(data)=>{
        (data.search) ? this.arraySearch=data.search:this.operacion=data.operacion;
      }
    });
  }
  pressButton():void{
    localStorage.removeItem('token');
    this.router.navigate(['/sign']);
  }
  showKeys():boolean{
    if(this.router.url=='/home'||this.router.url=='/profile') return true;
    return false;
  }
  pressIcon():void{
    this.classIcon='fa-solid fa-magnifying-glass search-icono';
    this.Search='';
  }
  focusInput():void{
    this.classIcon='fa-solid fa-arrow-down arrow-icono';
  }
  blurInput():void{
    if(this.Search=='') this.classIcon='fa-solid fa-magnifying-glass search-icono';
  }
}