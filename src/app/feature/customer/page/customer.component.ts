import { Component, OnInit } from '@angular/core';
import { CustomerDto } from 'src/app/core/dto/customer-dto';
import { CustomerService } from 'src/app/core/services/customer.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-costumer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: CustomerDto;
  dni: string;


  constructor(private tokenService: TokenService,private customerService: CustomerService){
    
  }
  ngOnInit(): void {
    this.dni=this.tokenService.getInfoToken().dni;
    if(this.dni.length>0){
      this.customerService.getCustomerByDni(this.dni).subscribe({
        next: value => this.customer=value
      })
    }
  
  }
  

}
