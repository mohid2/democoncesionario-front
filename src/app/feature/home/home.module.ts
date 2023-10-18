import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { CarDetailsComponent } from './pages/car/car-details/car-details.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    PortfolioComponent,
    HeaderNavComponent,
    CartComponent,
    CarDetailsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  exports:[HeaderNavComponent]
})
export class HomeModule { }
