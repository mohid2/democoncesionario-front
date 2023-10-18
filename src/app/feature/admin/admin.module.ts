import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RegisterCarComponent } from './pages/register-car/register-car.component';
import { InfoBasicCarFormComponent } from './components/info-basic-car-form/info-basic-car-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoMechCarFormComponent } from './components/info-mech-car-form/info-mech-car-form.component';
import { InfoAestheticCarFormComponent } from './components/info-aesthetic-car-form/info-aesthetic-car-form.component';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    RegisterCarComponent,
    InfoBasicCarFormComponent,
    InfoMechCarFormComponent,
    InfoAestheticCarFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HomeModule
  ]
})
export class AdminModule { }
