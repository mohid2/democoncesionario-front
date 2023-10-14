import { Injectable } from '@angular/core';
import { CarDto } from '../dto/car-dto';
import { CarPurchaseDto } from '../dto/car-purchase-dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CarPurchaseDto[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(carNew: CarDto): void {
    const existingCar = this.cartItems.find(car => car.codeCar === carNew.carCode);
    if (existingCar) {
      // Si el coche ya está en el carrito, aumentar la cantidad y actualizar el total
      existingCar.quantity++;
      existingCar.total = existingCar.quantity * carNew.price;
    } else {
      const newCarPurchase: CarPurchaseDto = {
        carBrandDescription: carNew.carBrandDescription,
        codeCar: carNew.carCode,
        reference:carNew.reference,
        price:carNew.price,
        quantity: 1,
        total: carNew.price
      };
      this.cartItems.push(newCarPurchase);
    }
    this.updateCartItemCount();
  }

  removeFromCart(car: CarDto): void {
    const existingCarIndex = this.cartItems.findIndex(item => item.codeCar === car.carCode);

    if (existingCarIndex !== -1) {
      // Si el coche está en el carrito, reducir la cantidad en 1
      const existingCar = this.cartItems[existingCarIndex];
      if (existingCar.quantity > 1) {
        existingCar.quantity--;
        existingCar.total = car.price*existingCar.quantity;
      } else {
        // Si la cantidad es 1 o menos, eliminar el elemento del carrito
        this.cartItems.splice(existingCarIndex, 1);
      }    }
    this.updateCartItemCount();
  }

  getCartItems(): CarPurchaseDto[] {
    return this.cartItems;
  }



  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  private updateCartItemCount(): void {
    const itemCount = this.cartItems.length;
    this.cartItemCountSubject.next(itemCount);
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartItemCount();
  }

  updateCartItem(item: CarPurchaseDto): void {
    // Busca el índice del elemento en el carrito
    const index = this.cartItems.findIndex(cartItem => cartItem.codeCar === item.codeCar);

    if (index !== -1) {
      // Actualiza el elemento en el carrito
      this.cartItems[index] = item;
      this.updateCartItemCount();
    }
  }

}
