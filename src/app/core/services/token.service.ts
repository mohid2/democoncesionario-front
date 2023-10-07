import { Injectable } from '@angular/core';
import { getCookie,setCookie } from 'typescript-cookie';
import jwt_decode from "jwt-decode";
import { JwtCostumerDto } from '../dto/jwt-costumer-dto';


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

  public clearToken(): void {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  public getInfoToken(): JwtCostumerDto{
    var token = getCookie('token');;
    var decoded = jwt_decode(token);
  
    // decode header by passing in options (useful for when you need `kid` to verify a JWT):
   return <JwtCostumerDto> decoded;
  }

  public isTokenExpired(): boolean {
    const infoToken = this.getInfoToken();

    const expirationTimestampInSeconds = infoToken.exp;
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    if (expirationTimestampInSeconds < currentTimestampInSeconds) {
      // El token ha caducado
      return true;
    } else {
      // El token aún es válido
      return false;
    }  
  }
    
}


