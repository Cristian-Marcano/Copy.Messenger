import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  loginClass:string='login';
  signUpClass:string='sign-up oculto';
  constructor(private toastr:ToastrService,private peticionesAuth:AuthService,private router:Router,private error:ErrorService) {}
  login(user:HTMLInputElement,pass:HTMLInputElement):void{
    if(this.verifInput(user.value,undefined,pass.value))this.peticionesAuth.login(user.value,pass.value).subscribe({
      next:(data)=>{
        localStorage.setItem('token',data.token);
        this.router.navigate(['/home']);
      }
    });
  }
  signup(username:HTMLInputElement,email:HTMLInputElement,password:HTMLInputElement):void{
    if(this.verifInput(username.value,email.value,password.value))this.peticionesAuth.signup(username.value,email.value,password.value).subscribe({
      next:(data)=>{
        localStorage.setItem('token',data.token);
        this.router.navigate(['/home']);
      }
    });
  }
  verifInput(username:string,email:string|undefined,password:string):boolean{
    let v:boolean=true;
    const regex = /^\S*$/;
    const regexx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(username.length<5 && regex.test(username)){
      this.toastr.error('Username debe de tener un minimo de 5 caracteres y sin espacios','Username invalido');
      v=false;
    } 
    if(email!=undefined && (!(regexx.test(email)) || email=='')){
      this.toastr.error('Inserto una direccion email invalida','Email invalido');
      v=false;
    } 
    if(password.length<8) {
      this.toastr.error('Password debe de contener un minimo de 8 caracteres','Password invalido');
      v=false;
    }
    return v;
  }
}