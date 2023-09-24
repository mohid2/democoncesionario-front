import { Injectable } from '@angular/core';
import { LoginRequestDto } from '../dto/LoginRequestDto';
import { Observable, tap } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthResponseDto } from '../dto/AuthResponseDto';
import { TokenService } from './token.service';
import { RegisterRequestDto } from '../dto/RegisterRequestDto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  apiURL: string =  environment.apiUrl


  constructor(private http: HttpClient, private tokenService:TokenService) { }

  public singIn(authDto: LoginRequestDto): Observable<AuthResponseDto>{
   return this.http.post<AuthResponseDto>(this.apiURL.concat('/api/auth/login'),authDto).pipe(
    tap(response =>{
      this.tokenService.saveToken(response.token)
    }) 
   );
  }
  public singUp(authDto: RegisterRequestDto): Observable<AuthResponseDto>{
    return this.http.post<AuthResponseDto>(this.apiURL.concat('/api/auth/register'),authDto).pipe(
     tap(response =>{
       this.tokenService.saveToken(response.token)
     }) 
    );
   }
}
