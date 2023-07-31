import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string='http://localhost:4004/Api/auth';
  constructor(private http:HttpClient) { }
  signup(username:string,email:string,password:string):Observable<{token:string,operacion:string}>{
    return this.http.post<{token:string,operacion:string}>(this.url+'/signup',{username,email,password});
  }
  login(username:string,password:string):Observable<{token:string,operacion:string}>{
    return this.http.post<{token:string,operacion:string}>(this.url+'/login',{username,password});
  }
  validateToken():Observable<{acceso:string|true}>{
    return this.http.get<{acceso:string|true}>(this.url+'/validate');
  }
  invalidateToken():Observable<{acceso:string|true}>{
    return this.http.get<{acceso:string|true}>(this.url+'/invalidate');
  }
}