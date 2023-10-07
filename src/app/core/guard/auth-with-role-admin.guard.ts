import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Roles } from '../enums/roles';



export const authWithRoleAdminGuard: CanActivateFn = (route, state) => {
  const tokenService=inject(TokenService); 
  const router=inject(Router); 

  if(tokenService.getInfoToken().role!=Roles.ADMIN){
    console.log(tokenService.getInfoToken().role)
    alert("no tiene permisos");
    router.navigate(['productos'])
    return false;
  }
  alert("si tiene permisos");
  return true;
};
