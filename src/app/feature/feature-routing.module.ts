import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'autenticacion',
    loadChildren: () => import("./auth/auth.module").then(auth => auth.AuthModule)
  },
  {
    path:'productos',
    loadChildren: () => import("./home/home.module").then(home => home.HomeModule)

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
