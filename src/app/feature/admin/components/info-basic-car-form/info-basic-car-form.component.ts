import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { CarBrandDto } from 'src/app/core/dto/car-brand-dto';
import { CarCategory } from 'src/app/core/enums/car-category';
import { CarBrandService } from 'src/app/core/services/car-brand.service';

@Component({
  selector: 'app-info-basic-car-form',
  templateUrl: './info-basic-car-form.component.html',
  styleUrls: ['./info-basic-car-form.component.css']
})
export class InfoBasicCarFormComponent implements OnInit  {

  public infoBasicFrom:  any;

  public listCarBrand: CarBrandDto[];

  public categoryOptions = Object.values(CarCategory);


  

  constructor(private controlContainer: ControlContainer,private carBrandService:CarBrandService){ 
    this.carBrandService.getAllCarBrand().subscribe({
      next: value=> this.listCarBrand=value
    })
  }

  ngOnInit(): void {
    this.infoBasicFrom=this.controlContainer.control  ;
    this.infoBasicFrom=this.infoBasicFrom.controls["infoBasicCarForm"] ;
  }

}
