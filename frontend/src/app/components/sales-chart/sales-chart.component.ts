import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import ViewSale from '../../interface/ViewSale';
import { SaleService } from '../../service/sale.service';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-sales-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, LoadingSpinnerComponent],
  providers: [provideEcharts(), SaleService],
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent {
  chartOption: EChartsOption | null = null;
  isBrowser: boolean;
  isLoading = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private saleService:SaleService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loadDataFromAPI(); 
    }
  }

  loadDataFromAPI() {
   /* this.isLoading = true;
    this.saleService.getAllSales().subscribe(sales => {
      const dates = sales.map(sale => this.formatDate(sale.date));
      const totals = sales.map(sale => sale.total.toFixed(2));
      
      this.chartOption = {
        xAxis: {
          type: 'category',
          data: dates,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Valor da Venda',
            type: 'bar',
            data: totals,
            label: {
              show: true,
              position: 'top',
              formatter: 'R$ {c}'
            }
          }
        ]
      };
      this.isLoading = false;
    });*/
  }
  formatDate(date: Date): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
