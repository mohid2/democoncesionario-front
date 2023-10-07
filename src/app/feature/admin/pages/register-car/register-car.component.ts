import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarDto } from 'src/app/core/dto/car-dto';
import { TractionTypes } from 'src/app/core/enums/traction-types';
import { CarService } from 'src/app/core/services/car.service';
import { FromValidator } from 'src/app/core/utils/from-validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent {

  public registerCarForm: FormGroup

  constructor(private fb:FormBuilder, private carService:CarService){

    this.registerCarForm= this.fb.group({
       infoBasicCarForm: this.fb.group({
        carBrandId: ['',Validators.required],
        reference: ['',Validators.required],
        price: ['',Validators.required],
        modelYear: ['',[Validators.required,FromValidator.dateNotGreaterThanTodayValidator()]],
        category:  ['',Validators.required],

       }),
       infoMechCarForm: this.fb.group({
        horsepower: ['',Validators.required],
        engineDisplacement: ['',Validators.required],
        transmission: ['',Validators.required],
        fuelType: ['',Validators.required],
        traction: ['',Validators.required],
        steering: ['',Validators.required],

       }),
       infoAestheticCarForm: this.fb.group({
        color: ['',Validators.required],
        numberDoors: ['',Validators.required],
        numberSeat: ['',Validators.required],
        imagePath: ['',Validators.required]
       })
    })
  }

  public  async saveCar(): Promise<void>{
    if(!this.registerCarForm.valid){
      alert('algo mal')
    }

    let formData= this.registerCarForm.value;

    let formBasic=formData['infoBasicCarForm'];
    let formMech=formData['infoMechCarForm'];
    let formAesthetic=formData['infoAestheticCarForm'];

    let dtoSaveCar: CarDto={
      ...formBasic,
      ...formMech,
      ...formAesthetic
    }
 
    console.log(dtoSaveCar)
    this.carService.saveCar(dtoSaveCar).subscribe(
      {
        next: value => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Todo guardado con exsito',
            showConfirmButton: false,
            timer: 3000
          });
          console.log(value)
         },
         error: err=> {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Hay algun error al guardar el coche',
            showConfirmButton: false,
            timer: 3000
          });
          console.log(err)
         }

      }
    )
  }
}
