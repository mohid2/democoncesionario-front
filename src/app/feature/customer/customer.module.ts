import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './page/customer.component';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CommonModule, 
    HomeModule
  ]
})
export class CustomerModule { }
