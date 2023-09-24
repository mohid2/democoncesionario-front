import { FormGroup } from "@angular/forms";

/**
 * Componente padre con validaciones generales
 */
export class AppBaseComponent{
    public isTouchedField=(form: FormGroup, field: string): boolean=>{
        return form?.get(field).touched==true && form?.get(field).invalid
    }
}