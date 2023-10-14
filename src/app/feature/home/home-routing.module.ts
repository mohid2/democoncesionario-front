import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { CartComponent } from './pages/cart/cart.component';
import { CarDetailsComponent } from './pages/car/car-details/car-details.component';

const routes: Routes = [
  {
    path:'',
    component: PortfolioComponent
  },
  {
    path:'carrito',
    component: CartComponent
  },
  { path: 'detalles-coche/:carCode',
   component: CarDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
