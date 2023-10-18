import { Injectable } from '@angular/core';
import { PurchaseDto } from '../dto/purchase-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { PurchaseResponseDto } from '../dto/purchase-response-dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private  apiURL: string =  environment.apiUrl


  constructor(private http: HttpClient) { }

  realizarCompra(purchase: PurchaseDto): Observable<PurchaseResponseDto>{
    return this.http.post<PurchaseResponseDto>(this.apiURL.concat('/api/purchase'),purchase);
  }
}
