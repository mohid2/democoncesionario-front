import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  public nameCustomer: string;
  cartItemCount: number =0;
  isCartEmpty: boolean = true;
  isLoggedIn: boolean = false;


  constructor(private tokenService: TokenService,private cartService: CartService,private authService: AuthService){
  }
  ngOnInit(): void {
     // Verificar si el token está presente
     if (this.tokenService.getToken()) {
      this.isLoggedIn = true; // Establecer isLoggedIn a true si el token está presente
      this.nameCustomer = this.tokenService.getInfoToken().sub;
    }

    // Suscríbete al servicio para obtener el contador de elementos del carrito
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
      this.isCartEmpty = this.cartItemCount === 0;
    });
  }
  logout(){
    this.authService.logout(this.tokenService.getToken()).subscribe(
      () => {
        // La sesión se cerró correctamente y se redirigió a la página de inicio de sesión
      },
      error => {
        // Maneja cualquier error que pueda ocurrir durante el cierre de sesión
      }
    );
  }
}
