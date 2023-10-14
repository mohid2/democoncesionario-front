import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarDto } from 'src/app/core/dto/car-dto';
import { CarService } from 'src/app/core/services/car.service';
import { CartService } from 'src/app/core/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  public cars: CarDto[];
  public brand: string='';
  public price: number=0;



  constructor(private carService: CarService, private cartService: CartService,private router: Router){}
  ngOnInit(): void {
    this.loadCars();
  }

private loadCars() {
  this.carService.getAllCars()?.subscribe({
    next: (value) => {
      this.cars = value;
    }
  });
}

public searchByBrand() {
  if (this.brand.trim() === '') {
    this.loadCars();
  }else {
    const brandExists = this.checkBrandExists(this.brand);
    if (!brandExists) {
      Swal.fire({
        icon: 'info',
        title: 'La marca introducida no existe',
      })
    }else {
    this.carService.getCarByBrand(this.brand)?.subscribe({
      next: (value) => {
        this.cars = value;
      }
    });
  }
}}

viewCarDetails(carCode: number){
  this.router.navigate(['/car-details', carCode]);
}

onBrandInputChange() {
  if (this.brand.trim() === '') {
    this.loadCars();
  }
}
checkBrandExists(brand: string): boolean {
  return this.cars.some(car => car.carBrandDescription.toLowerCase() === brand);
}
   /**
 * Agregar un coche al carrito
 * @param carNew Coche a agregar
 */
   public addCarsShopingCart(carNew: CarDto): void {
    this.cartService.addToCart(carNew);
  }
  
  /**
   * Eliminar un coche del carrito
   * @param car Coche a eliminar
   */
  public deleteCarsShopingCart(car: CarDto): void {
    this.cartService.removeFromCart(car);
  }
}
