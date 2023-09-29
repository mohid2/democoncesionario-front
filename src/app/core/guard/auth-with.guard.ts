import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authWithGuard: CanActivateFn = (route, state) => {
  const tokenService=inject(TokenService); 
  const router=inject(Router); 

  const token=tokenService.getToken();
  if(token){
    router.navigate(['productos'])
    return false;
  }
  return true;
};
