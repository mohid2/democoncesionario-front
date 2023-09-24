import { Injectable } from '@angular/core';
import { getCookie,setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public saveToken(token: string): void{
    setCookie('token',token,{expires: 1,path:'/'});
  }
  public getToken(): string{
    return getCookie('token');
  }
}
