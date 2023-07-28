import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  photo_profile:string='';
  constructor(private peticionesAuth:AuthService,private peticionProfile:ProfileService,private router:Router) {
    this.peticionesAuth.validateToken().subscribe({
      next:(data)=> this.peticionProfile.getProfile().subscribe({
        next:(data)=> this.photo_profile=data.photo_profile
      }),
      error:(err:HttpErrorResponse)=>this.router.navigate(['/sign'])
    });
  }
  imgError():void{
    this.photo_profile = 'https://i.pinimg.com/280x280_RS/42/03/a5/4203a57a78f6f1b1cc8ce5750f614656.jpg';
  }
  sendPhotoProfile(photo:HTMLInputElement):void{
    this.peticionProfile.updateProfile(photo.value).subscribe({
      next:(data)=> this.photo_profile=data.photo_profile,
      error:(err:HttpErrorResponse)=>this.router.navigate(['/sign'])
    });
  }
}
