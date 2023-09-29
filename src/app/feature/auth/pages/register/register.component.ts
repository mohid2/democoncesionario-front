import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { RegisterRequestDto } from 'src/app/core/dto/RegisterRequestDto';
import { TokenService } from 'src/app/core/services/token.service';
import { lastValueFrom } from 'rxjs';
import { ErrorsForm } from 'src/app/core/enums/errors-form';
import { FromValidator } from 'src/app/core/utils/from-validator';
import Swal from 'sweetalert2';

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
      dni:['',[Validators.required,FromValidator.dniNieValidator()]],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required,FromValidator.emailValidator()]],
      phoneNumber:['',[Validators.required,FromValidator.OnlyNumberValidator(),FromValidator.phoneNumberLengthValidator()]],
      password:['',[Validators.required,FromValidator.passwordValidator()]]
    })
  }

  public async singUp(): Promise<void>{

    let dtoRegister: RegisterRequestDto;
   

    if(this.registerForm.valid){


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

      await this.router.navigateByUrl('/productos');
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        text: 'se ha creado el usuario con exsito',
      })
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
        message = ErrorsForm.REQUIRED;
      }else if(this.registerForm.get(field).hasError('emailValidator')){
        message=ErrorsForm.EMAIL;
      }else if(this.registerForm.get(field).hasError('OnlyNumberValidator')){
        message=ErrorsForm.ONLY_NUMBER
      }else if(this.registerForm.get(field).hasError('phoneNumberLengthValidator')){
        message=ErrorsForm.PHONE_NUMBER_LENGTH
      }
      else if(this.registerForm.get(field).hasError('passwordValidator')){
        message=ErrorsForm.PASSWORD
      }else if(this.registerForm.get(field).hasError('dniNieValidator')){
        message=ErrorsForm.DNI_NIE
     }

  }
  return message;
}

}
