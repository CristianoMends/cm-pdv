import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { SalesChartComponent } from "../../components/sales-chart/sales-chart.component";
import { PaymentChartComponent } from "../../components/payment-chart/payment-chart.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, SideMenuComponent, SalesChartComponent, PaymentChartComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
