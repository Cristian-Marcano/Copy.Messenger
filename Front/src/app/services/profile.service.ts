import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private urlProfile:string = 'http://localhost:4004/Api/profile';
  constructor(private http:HttpClient,private peticionesAuth:AuthService,private router:Router) { }
  getProfile():Observable<{photo_profile:string}>{
    return this.http.get<{photo_profile:string}>(this.urlProfile);
  }
  updateProfile(photo:string):Observable<{photo_profile:string}>{
    return this.http.put<{photo_profile:string}>(this.urlProfile+'/update',{photo});
  }
}
