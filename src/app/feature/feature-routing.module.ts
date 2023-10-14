import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authWithOutGuard } from '../core/guard/auth-without.guard';
import { authWithGuard } from '../core/guard/auth-with.guard';
import { authWithRoleAdminGuard} from '../core/guard/auth-with-role-admin.guard';

const routes: Routes = [
  {
    path:'autenticacion',
    loadChildren: () => import("./auth/auth.module").then(auth => auth.AuthModule)
  },
  {
    path:'productos',
    loadChildren: () => import("./home/home.module").then(home => home.HomeModule)

  },
  {
    path:'admin',
    canActivate:[authWithRoleAdminGuard],
    loadChildren: () => import("./admin/admin.module").then(admin => admin.AdminModule)

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
