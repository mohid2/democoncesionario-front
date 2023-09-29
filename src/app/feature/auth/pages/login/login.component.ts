import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LoginRequestDto } from 'src/app/core/dto/LoginRequestDto';
import { ErrorsForm } from 'src/app/core/enums/errors-form';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { FromValidator } from 'src/app/core/utils/from-validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent{

  public loginForm: FormGroup;

  constructor(private router:Router, private fb:FormBuilder, private authService: AuthService, private tokenService: TokenService){
    super();
    this.loginForm= this.fb.group({
      email:['',[Validators.required,FromValidator.emailValidator()]],
      password:['',[Validators.required,FromValidator.passwordValidator()]]
    })
  }

  public async singIn(): Promise<void>{
    
    let dtoLogin: LoginRequestDto;
   

    if(this.loginForm.valid){

      let email= this.loginForm.get('email').value
      let password= this.loginForm.get('password').value

      dtoLogin={
        email,
        password
      }

     await lastValueFrom(this.authService.singIn(dtoLogin)) ;
   
     console.log(this.tokenService.getToken());

     await this.router.navigateByUrl('/productos');

     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Ha iniciado sesion con exsito',
      showConfirmButton: false,
      timer: 3000
    });

    }else{
      this.loginForm.markAllAsTouched();
    }
  }

  public singUp(): void{
    this.router.navigateByUrl('/autenticacion/registro');
  }  

  public getErrorsForm(field: string): string{

    let message;

    if(this.isTouchedField(this.loginForm,field)){
      if(this.loginForm.get(field).hasError('required')){

        message = ErrorsForm.REQUIRED;
        
      }else if(this.loginForm.get(field).hasError('emailValidator')){
        message= ErrorsForm.EMAIL;
      }
      else if(this.loginForm.get(field).hasError('passwordValidator')){
        message= ErrorsForm.PASSWORD;
      }
    }
    return message
  }
}
