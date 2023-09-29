import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authWithOutGuard } from '../core/guard/auth-without.guard';
import { authWithGuard } from '../core/guard/auth-with.guard';

const routes: Routes = [
  {
    path:'autenticacion',
    canActivate:[authWithGuard],
    loadChildren: () => import("./auth/auth.module").then(auth => auth.AuthModule)
  },
  {
    path:'productos',
    canActivate:[authWithOutGuard],
    loadChildren: () => import("./home/home.module").then(home => home.HomeModule)

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
