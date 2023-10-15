import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CustomerDto } from '../dto/customer-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private  apiURL: string =  environment.apiUrl

  constructor(private http: HttpClient) { }


  public getCustomerByDni(dni: string): Observable<CustomerDto>{
    return this.http.get<CustomerDto>(this.apiURL.concat('/api/clientes/'+dni));
  }
}
