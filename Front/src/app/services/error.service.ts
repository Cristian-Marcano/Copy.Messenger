import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private toastr:ToastrService) { }
  msjError(err:HttpErrorResponse):void{
    if(err.error.operacion) this.toastr.error(err.error.operacion,'ERROR');
    else if(err.error.acceso) this.toastr.error(err.error.acceso,'ERROR');
    else this.toastr.error('Ups, ocurrio un error, comuniquese con el administrador','ERROR');
  }
}
