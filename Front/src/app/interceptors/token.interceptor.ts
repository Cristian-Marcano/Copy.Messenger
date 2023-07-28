import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router:Router,private error:ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if(token) request = request.clone({setHeaders:{Authorization:'Bearer '+token}});
    return next.handle(request).pipe(catchError((error:HttpErrorResponse)=>{
      this.error.msjError(error);
      if(error.status==401) this.router.navigate(['/sign']);
      throw throwError(()=> new Error('ERROR'));
    }));
  }
}
