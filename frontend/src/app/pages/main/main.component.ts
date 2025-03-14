import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { SalesDashboardComponent } from "../../components/sales-dashboard/sales-dashboard.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, SideMenuComponent, SalesDashboardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  
}
