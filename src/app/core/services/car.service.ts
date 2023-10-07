import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDto } from '../dto/car-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TractionTypes } from '../enums/traction-types';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private  apiURL: string =  environment.apiUrl

  constructor(private http: HttpClient) { }

  

  public getAllCars(): Observable<CarDto[]>{
    return this.http.get<CarDto[]>(this.apiURL.concat('/api/coches'));
  }

  public saveCar(carDto: CarDto): Observable<CarDto>{
    return this.http.post<CarDto>(this.apiURL.concat('/api/coches'),carDto);
  }

}
