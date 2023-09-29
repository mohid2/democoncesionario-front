import { Injectable } from '@angular/core';
import { getCookie,setCookie } from 'typescript-cookie';
import jwt_decode from "jwt-decode";


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

  public decodeToken(): void{
    var token = getCookie('token');;
    var decoded = jwt_decode(token);
 
    console.log(decoded);
 

    // decode header by passing in options (useful for when you need `kid` to verify a JWT):
    var decodedHeader = jwt_decode(token, { header: true });
    console.log(decodedHeader);
 

  }
}
