import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { SaleService } from '../../service/sale.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EChartsOption } from 'echarts';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-payment-chart',
  standalone: true,
  providers: [provideEcharts(), SaleService],
  imports: [CommonModule, NgxEchartsDirective, LoadingSpinnerComponent],
  templateUrl: './payment-chart.component.html',
  styleUrls: ['./payment-chart.component.css'] // Corrigido de styleUrl para styleUrls
})
export class PaymentChartComponent {
  chartOption: EChartsOption | null = null;
  isBrowser: boolean;
  isLoading = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private saleService: SaleService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loadDataFromAPI(); 
    }
  }

  loadDataFromAPI() {
    this.isLoading = true;
   /* this.saleService.getAllSales().subscribe(sales => {
      const paymentMethodsCount = this.countPaymentMethods(sales);

      this.chartOption = {
        tooltip: {
          trigger: 'item',

        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Métodos de Pagamento',
            type: 'pie',
            radius: '50%',
            data: paymentMethodsCount,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{b}: {c} ({d}%)'
            }
          }
        ]
      };
      this.isLoading = false;
    });*/
  }

  countPaymentMethods(sales: any[]): { name: string; value: number }[] {
    const paymentMethodsMap: { [key: string]: number } = {};

    sales.forEach(sale => {
      const method = sale.paymentMethod;
      if (paymentMethodsMap[method]) {
        paymentMethodsMap[method]++;
      } else {
        paymentMethodsMap[method] = 1;
      }
    });

    return Object.entries(paymentMethodsMap).map(([name, value]) => ({ name, value }));
  }
}
