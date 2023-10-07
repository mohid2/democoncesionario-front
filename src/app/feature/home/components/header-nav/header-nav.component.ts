import { Component } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent {

  public nameCustomer: string;

  constructor(private tokenService: TokenService){
    this.nameCustomer = tokenService.getInfoToken().firstname;
  }

}
