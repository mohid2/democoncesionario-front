import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDto } from '../dto/car-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private  apiURL: string =  environment.apiUrl

  constructor(private http: HttpClient) { }

  

  public getAllCars(): Observable<CarDto[]>{
    return this.http.get<CarDto[]>(this.apiURL.concat('/api/coches'));
  }
  public getCarByBrand(brand: string): Observable<CarDto[]>{
    return this.http.get<CarDto[]>(this.apiURL.concat('/api/coches/marcas/'+brand));
  }
  public getCarById(carCode: string): Observable<CarDto>{
    return this.http.get<CarDto>(this.apiURL.concat('/api/coches/'+carCode));
  }

  public saveCar(carDto: CarDto): Observable<CarDto>{
    return this.http.post<CarDto>(this.apiURL.concat('/api/coches'),carDto);
  }

}
