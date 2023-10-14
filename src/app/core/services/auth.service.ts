import { Injectable } from '@angular/core'
import { LoginRequestDto } from '../dto/LoginRequestDto';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthResponseDto } from '../dto/AuthResponseDto';
import { TokenService } from './token.service';
import { RegisterRequestDto } from '../dto/RegisterRequestDto';
import swal from 'sweetalert2';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  apiURL: string =  environment.apiUrl


  constructor(private http: HttpClient, private tokenService:TokenService,private router: Router) { }

  public singIn(authDto: LoginRequestDto): Observable<AuthResponseDto>{
   return this.http.post<AuthResponseDto>(this.apiURL.concat('/api/auth/login'),authDto).pipe(
    tap(response =>{
      this.tokenService.saveToken(response.token)
    }),catchError(error => {
      if (error.status === 403) {
        // Código de estado 409 (Conflict) - El usuario ya existe
        // Muestra una alerta o maneja la situación como desees
        swal.fire("Error","El usuario no existe",'error');
      }
      // Puedes manejar otros errores aquí si es necesario
      return throwError(()=>error.status);
    })
   );
  }


  public singUp(authDto: RegisterRequestDto): Observable<AuthResponseDto>{
    return this.http.post<AuthResponseDto>(this.apiURL.concat('/api/auth/register'),authDto).pipe(
     tap(response =>{
       this.tokenService.saveToken(response.token)
     }),catchError(error => {
       if (error.status === 409) {
         // Código de estado 409 (Conflict) - El usuario ya existe
         // Muestra una alerta o maneja la situación como desees
       }
       // Puedes manejar otros errores aquí si es necesario
       return throwError(()=>error.status);
     })
    );
   }
   // Método para cerrar sesión
  logout(token: any): Observable<void> {
    return this.http.post<void>(this.apiURL.concat('/api/auth/logout'),token).pipe(
      tap(response =>{
          // Elimina el token de sesión
          this.tokenService.removeToken();
          console.log(token);
          // Redirige al usuario a la página de inicio de sesión
          this.router.navigateByUrl('autenticacion/inicio-sesion');
      })
     );
    

  }
   
}
