import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { SpanishIdValidator } from "./spanish-id-validator";

/**
 * clase para manejar validadores personalizados
 */
export class FromValidator {

 // Patrón de expresión regular para validar el formato de correo electrónico
 private static validEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
 // Patrón de expresión regular para verificar si solo contiene números
 private static NumberPattern =   /^[0-9]*$/;

 // Patrón de expresión regular para verificar que tenga exactamente 9 dígitos
 private static phonelengthPattern = /^[0-9]{9}$/;


 static emailValidator(): ValidatorFn {
   return (control: AbstractControl): ValidationErrors | null => {
     const email = control.value as string; // Obtén el valor del control

     if (!email.match(this.validEmailPattern)) {
       // Si el correo electrónico no coincide con el patrón, devuelve un error personalizado
       return { emailValidator: true };
     }

     // Si la validación pasa, devuelve null (sin errores)
     return null;
   };
 }

  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value as string; // Obtén el valor del control
  
      if (password.length < 6) {
        // Si la contraseña tiene menos de 6 caracteres, devuelve un error personalizado
        return { passwordValidator: true };
      }
  
      // Si la validación pasa, devuelve null (sin errores)
      return null;
    };
}
  static dniNieValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dniNie = control.value as string; // Obtén el valor del control

      // Llama a la función validateSpanishID para validar el DNI/NIE
      const validationResult = SpanishIdValidator.validateSpanishID(dniNie);

      if (validationResult.valid) {
        // Si la validación pasa, devuelve null (sin errores)
        return null;
      } else {
        // Si la validación falla, devuelve un error personalizado
        return { dniNieValidator: true };
      }
    };
  }
    // Validador para verificar que el campo contiene solo números
    static OnlyNumberValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const phoneNumber = control.value as string; // Obtén el valor del control

  
        if (!phoneNumber.match(this.NumberPattern)) {
          // Si no coincide con el patrón de solo números, devuelve un error personalizado
          return { OnlyNumberValidator: true };
        }
  
        // Si la validación pasa, devuelve null (sin errores)
        return null;
      };
    }
  
    // Validador para verificar que el campo tiene exactamente 9 dígitos
    static phoneNumberLengthValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const phoneNumber = control.value as string; // Obtén el valor del control
    
        if (!phoneNumber.match(this.phonelengthPattern)) {
          // Si no coincide con el patrón de 9 dígitos, devuelve un error personalizado
          return { phoneNumberLengthValidator: true };
        }
  
        // Si la validación pasa, devuelve null (sin errores)
        return null;
      };
    }
    static dateNotGreaterThanTodayValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const selectedDate = new Date(control.value);
        const currentDate = new Date();
    
        if (selectedDate > currentDate) {
          return { dateGreaterThanToday: true };
        }
        
        return null;
      };
    }

}

