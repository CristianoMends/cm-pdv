import { Component } from '@angular/core';
import { SalesRegisterBoxComponent } from "../../components/sales-register-box/sales-register-box.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: 'app-sale-register',
  standalone: true,
  imports: [SalesRegisterBoxComponent, HeaderComponent, SideMenuComponent],
  templateUrl: './sale-register.component.html',
  styleUrl: './sale-register.component.css'
})
export class SaleRegisterComponent {

}
