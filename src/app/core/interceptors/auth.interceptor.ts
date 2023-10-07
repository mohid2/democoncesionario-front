import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token= this.tokenService.getToken();


    if(token && !this.tokenService.isTokenExpired()){
      let authRequest=request.clone(
        {
          setHeaders: { Authorization: `Bearer ${token}`},
      });
      return next.handle(authRequest);
     
    }
    this.tokenService.clearToken();
    // Redirige a la página de inicio de sesión
    this.router.navigateByUrl('autenticacion/inicio-sesion');
    
    return next.handle(request);
  }
}
