import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { RegisterRequestDto } from 'src/app/core/dto/RegisterRequestDto';
import { TokenService } from 'src/app/core/services/token.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent {

  public registerForm: FormGroup;

  constructor(private router:Router, private fb:FormBuilder, private authService: AuthService,private tokenService: TokenService){
    super();
    this.registerForm= this.fb.group({
      dni:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phoneNumber:['',Validators.required],
      password:['',Validators.required]
    })
  }

  public async singUp(): Promise<void>{

    let dtoRegister: RegisterRequestDto;
   

    if(this.registerForm.valid){

      alert('todo ok');

      let dni= this.registerForm.get('dni').value
      let lastname= this.registerForm.get('lastname').value
      let firstname=this.registerForm.get('firstname').value
      let email=this.registerForm.get('email').value
      let phoneNumber=this.registerForm.get('phoneNumber').value
      let password=this.registerForm.get('password').value

      dtoRegister={
        dni,
        lastname,
        firstname,
        email,
        phoneNumber,
        password
      }
      await lastValueFrom(this.authService.singUp(dtoRegister)) ;
   
      console.log(this.tokenService.getToken());
 
      await this.router.navigateByUrl('/productos');
    }else{
      alert('algo esta mal');
      this.registerForm.markAllAsTouched();
    }

  }

  public singIn(): void{
    this.router.navigateByUrl('/autenticacion/inicio-sesion')
  }

  public getErrorsForm(field: string): string{
    let message;

    if(this.isTouchedField(this.registerForm,field)){
      if(this.registerForm.get(field).hasError('required')){
        message = 'El campo es requerido';
      }else if(this.registerForm.get(field).hasError('email')){

        message="El formato de correo es invalido"
      }
    }
    return message
  }

}
