import { Component, OnInit, Output } from '@angular/core';
import { CarPurchaseDto } from 'src/app/core/dto/car-purchase-dto';
import { JwtCostumerDto } from 'src/app/core/dto/jwt-costumer-dto';
import { CartService } from 'src/app/core/services/cart.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  public carsPurchase: CarPurchaseDto[] = [];
  public costumer: JwtCostumerDto;


  constructor( private cartService: CartService,private tokenService: TokenService ){

    this.carsPurchase=this.cartService.getCartItems();
    this.costumer= this.tokenService.getInfoToken();
  }
  increaseQuantity(item: CarPurchaseDto): void {
    item.quantity++; // Incrementa la cantidad del producto en 1
    item.total = item.price * item.quantity; // Recalcula el total
    this.cartService.updateCartItem(item); // Actualiza el elemento en el servicio
  }

  decreaseQuantity(item: CarPurchaseDto): void {
    if (item.quantity > 1) {
      item.quantity--; // Disminuye la cantidad del producto en 1 si es mayor que 1
      item.total = item.price * item.quantity; // Recalcula el total
      this.cartService.updateCartItem(item); // Actualiza el elemento en el servicio
    }
  }
  calculateTotal(): number {
    let total = 0;
    for (const item of this.carsPurchase) {
      total += item.total * item.quantity;
    }
    return total;
  }
 
}
