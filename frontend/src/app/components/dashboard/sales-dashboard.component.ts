import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Order } from '../../interface/Order';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import ProductItem from '../../interface/ProductItem';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, NgxEchartsDirective, LoadingSpinnerComponent, FormsModule],
  providers: [provideEcharts(), OrderService],
  templateUrl: './sales-dashboard.component.html',
  styleUrl: './sales-dashboard.component.css'
})
export class SalesDashboardComponent {
  isBrowser: boolean;
  isLoading: boolean = false;
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  chartOption: EChartsOption | null = null;
  pieChartOption: EChartsOption | null = null;
  lineChartOption: EChartsOption | null = null;

  // Dados para os cartões de resumo
  totalOrders: number = 0;
  totalSales: number = 0;
  pendingOrders: number = 0;
  completedOrders: number = 0;
  canceledOrders: number = 0;

  // Filtro de mês
  selectedMonth: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private orderService: OrderService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.setDefaultMonth();
      this.loadOrders();
    }
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getAll().subscribe((orders: Order[]) => {
      this.orders = orders;
      this.applyMonthFilter();
      this.isLoading = false;
    }, error => {
      console.error('Erro ao carregar os pedidos', error);
      this.isLoading = false;
    });
  }

  setDefaultMonth(): void {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    this.selectedMonth = `${year}-${month}`;
  }

  applyMonthFilter(): void {
    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-').map(Number);
      this.filteredOrders = this.orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getFullYear() === year && orderDate.getMonth() + 1 === month;
      });
    } else {
      this.filteredOrders = [...this.orders];
    }

    this.calculateSummary();
    this.setupCharts();
  }

  onMonthChange(): void {
    this.applyMonthFilter();
  }

  calculateSummary(): void {
    this.totalOrders = this.filteredOrders.length;
    this.totalSales = this.filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    this.pendingOrders = this.filteredOrders.filter(order => order.deliveryStatus === 'PENDING').length;
    this.completedOrders = this.filteredOrders.filter(order => order.deliveryStatus === 'COMPLETED').length;
    this.canceledOrders = this.filteredOrders.filter(order => order.deliveryStatus === 'CANCELED').length;
  }

  setupCharts(): void {
    this.setupBarChart();
    this.setupPieChart();
    this.setupLineChart();
  }

  setupBarChart(): void {
    const salesByDay = this.filteredOrders.reduce((acc, order) => {
      const date = this.formatDate(order.createdAt);
      acc[date] = (acc[date] || 0) + order.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    this.chartOption = {
      xAxis: { type: 'category', data: Object.keys(salesByDay) },
      yAxis: { type: 'value' },
      series: [{
        name: 'Total de Vendas por Dia',
        type: 'bar',
        data: Object.values(salesByDay),
        label: { show: true, position: 'top', formatter: (params: any) => this.formatCurrency(params.value) }
      }]
    };
  }

  setupPieChart(): void {
    const productSales = this.calculateProductSales();
    const topProducts = productSales.slice(0, 5);

    this.pieChartOption = {
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      series: [{
        name: 'Produtos Mais Vendidos',
        type: 'pie',
        radius: '55%',
        data: topProducts
      }]
    };
  }

  setupLineChart(): void {
    const dates = this.filteredOrders.map(order => this.formatDate(order.createdAt));
    const totals = this.filteredOrders.map(order => order.totalAmount);
  
    this.lineChartOption = {
      tooltip: { 
        trigger: 'axis',
        formatter: (params: any) => {
          // Formatando os valores de totalAmount
          const date = params[0].name;
          const value = this.formatCurrency(params[0].value);
          return `${date}<br/>${value}`;
        }
      },
      xAxis: { type: 'category', data: dates },
      yAxis: { type: 'value' },
      series: [{
        name: 'Histórico de Vendas',
        type: 'line',
        data: totals
      }]
    };
  }
  

  calculateProductSales(): any[] {
    const productSalesMap: { [key: string]: { name: string, quantity: number } } = {};

    this.filteredOrders.forEach(order => {
      order.productOrders.forEach((product: ProductItem) => {
        if (productSalesMap[product.product.name]) {
          productSalesMap[product.product.name].quantity += product.quantity;
        } else {
          productSalesMap[product.product.name] = {
            name: product.product.name,
            quantity: product.quantity
          };
        }
      });
    });

    return Object.values(productSalesMap).sort((a, b) => b.quantity - a.quantity)
      .map(product => ({ value: product.quantity, name: product.name }));
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  }

  // Método para formatar valores monetários
  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
