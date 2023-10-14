import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgModel } from '@angular/forms';
import { FuelType } from 'src/app/core/enums/fuel-type';
import { SteeringType } from 'src/app/core/enums/steering-type';
import { TractionTypes } from 'src/app/core/enums/traction-types';
import { TransmissionType } from 'src/app/core/enums/transmission-type';

@Component({
  selector: 'app-info-mech-car-form',
  templateUrl: './info-mech-car-form.component.html',
  styleUrls: ['./info-mech-car-form.component.css'],
  providers: [NgModel] 
})
export class InfoMechCarFormComponent implements OnInit {

  public InfoMechForm:  any;
  
  public transmissionOptions = Object.values(TransmissionType);
  public tractionOptions = Object.values(TractionTypes);
  public fuelOptions = Object.values(FuelType);
  public steeringOptions = Object.values(SteeringType);



  constructor(private controlContainer: ControlContainer){}

  ngOnInit(): void {
    this.InfoMechForm=this.controlContainer.control  ;
    this.InfoMechForm=this.InfoMechForm.controls["infoMechCarForm"] 
  }

}
