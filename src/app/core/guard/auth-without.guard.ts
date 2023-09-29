import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';


export const authWithOutGuard: CanActivateFn = (route, state) => {
  const tokenService=inject(TokenService); 
  const router=inject(Router); 

  const token=tokenService.getToken();
  if(!token){
    router.navigateByUrl('autenticacion/inicio-sesion')
    return false;
  }
  return true;
};
