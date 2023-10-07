import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarBrandDto } from '../dto/car-brand-dto';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {
  private  apiURL: string =  environment.apiUrl


  constructor(private http: HttpClient) { }

  

  public getAllCarBrand(): Observable<CarBrandDto[]>{
    return this.http.get<CarBrandDto[]>(this.apiURL.concat('/api/marcas'));
  }
}
