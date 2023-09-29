/**
 * Dto de registro de clientes
 */
export interface RegisterRequestDto{
    dni: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;

}