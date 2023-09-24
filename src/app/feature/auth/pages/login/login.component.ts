import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LoginRequestDto } from 'src/app/core/dto/LoginRequestDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';

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
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  public async singIn(): Promise<void>{
    
    let dtoLogin: LoginRequestDto;
   

    if(this.loginForm.valid){

      alert('todo ok');

      let email= this.loginForm.get('email').value
      let password= this.loginForm.get('password').value

      dtoLogin={
        email,
        password
      }

     await lastValueFrom(this.authService.singIn(dtoLogin)) ;
   
     console.log(this.tokenService.getToken());

     await this.router.navigateByUrl('/productos');

    }else{
      alert('algo esta mal');
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

        message = 'El campo es requerido';
        
      }else if(this.loginForm.get(field).hasError('email')){

        message="El formato de correo es invalido"
      }
    }
    return message
  }
}
