import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { CostumerComponent } from './costumer/costumer/costumer.component';


@NgModule({
  declarations: [
    FeatureComponent,
    CostumerComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
  ]
})
export class FeatureModule { }
