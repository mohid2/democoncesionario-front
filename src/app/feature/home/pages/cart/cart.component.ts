import { Component, OnInit, Output } from '@angular/core';
import { CarPurchaseDto } from 'src/app/core/dto/car-purchase-dto';
import { CarPurchaseRequestDto } from 'src/app/core/dto/car-purchase-request-dto';
import { CarPurchaseResponseDto } from 'src/app/core/dto/car-purchase-response-dto';
import { JwtCostumerDto } from 'src/app/core/dto/jwt-costumer-dto';
import { PurchaseDto } from 'src/app/core/dto/purchase-dto';
import { PurchaseResponseDto } from 'src/app/core/dto/purchase-response-dto';
import { CartService } from 'src/app/core/services/cart.service';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']

})
export class CartComponent {

  public carsPurchase: CarPurchaseDto[] = [];
  public customer: JwtCostumerDto;
  public PurchaseResponse: PurchaseResponseDto;
  public carPurchaseResponseDto: CarPurchaseResponseDto[] = [];


  constructor( private cartService: CartService,private tokenService: TokenService,private purchaseService: PurchaseService ){

    this.carsPurchase=this.cartService.getCartItems();
    this.customer= this.tokenService.getInfoToken();
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

  onPurchase() {
   const carsPurchaseRequest: CarPurchaseRequestDto[] = [];

  for (const item of this.carsPurchase) {
    const carPurchaseRequest: CarPurchaseRequestDto = {
      invoiceNumber: 0, // No estoy seguro de dónde obtener este valor
      carCode: item.codeCar, // Supongo que esto es correcto
      quantity: item.quantity,
      total: item.total,
    };
    carsPurchaseRequest.push(carPurchaseRequest);
  }
    const purchase: PurchaseDto = {
      customerDni: this.customer.dni,
      total: this.calculateTotal() ,
      carPurchaseDTOs: carsPurchaseRequest,
      paymentMethod:'tarjeta',
      date: new Date(Date.now()),
      // Incluye los datos del cliente y los productos comprados
    };
    console.log(purchase)
    this.purchaseService.realizarCompra(purchase).subscribe(
      (response: PurchaseResponseDto) => {
        this.PurchaseResponse = response;     
        
      },
      (error) => {
        // Manejo de errores, como mostrar un mensaje de error al usuario
        console.error('Error al realizar la compra', error);
      }
    );
  }
 
}
