import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { CarDto } from 'src/app/core/dto/car-dto';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit  {

  public carCode: string;
  public car : CarDto = null;

  constructor(private carService: CarService , private route: ActivatedRoute){
   
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.carCode = params.get('carCode');
      this.carService.getCarById(this.carCode).subscribe(
        (value: CarDto) => {
          this.car = value;
        }
      );
    });
  }
}
