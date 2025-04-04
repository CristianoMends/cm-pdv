import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { ItemSelectionComponent } from "../../components/item-selection/item-selection.component";
import { MessageComponent } from "../../shared/message/message.component";
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { ViewChild } from '@angular/core';
import Product from '../../interface/Product';
import { StockService } from '../../service/stock.service';
import Stock from '../../interface/Stock';
import ProductItem from '../../interface/ProductItem';
import { SaleSummaryComponent } from "../../components/sale-summary/sale-summary.component";
import { NgIf } from '@angular/common';
import { PaymentSectionComponent } from "../../components/payment-section/payment-section.component";
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-sale-register',
  standalone: true,
  providers: [StockService, OrderService],
  imports: [NgIf, HeaderComponent, SideMenuComponent, ItemSelectionComponent, MessageComponent, LoadingSpinnerComponent, SaleSummaryComponent, PaymentSectionComponent],
  templateUrl: './sale-register.component.html',
  styleUrl: './sale-register.component.css'
})
export class SaleRegisterComponent implements OnInit {
  @ViewChild('messageComp') message!: MessageComponent;

  products: Product[] = [];
  productSales: ProductItem[] = [];
  isLoading: boolean = false;
  selectedItemsMap: Map<Product, number> = new Map<Product, number>();
  total: number = 0;
  showPayment = false;

  constructor(private stockService: StockService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadProductsOnStock();

  }

  ngAfterViewInit() {
    if (!this.message) {
      console.error("A referência ao componente de mensagem não foi inicializada.");
    }
  }

  loadProductsOnStock() {
    this.isLoading = true;
    this.stockService.getStock().subscribe({
      next: (stock: Stock[]) => {
        this.products = stock.map(s => s.product);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.showMessage('Erro ao carregar os produtos. Verifique sua conexão e tente novamente.', 'error');
      }
    });
  }

  showMessage(message: string, type: 'success' | 'error', label: string = 'OK') {
    setTimeout(() => {
      if (this.message) {
        this.message.show(message, type, label);
      } else {
        console.error("O componente de mensagem não foi inicializado a tempo.");
      }
    });
  }

  onMessageOk() {
    console.log("O usuário fechou a mensagem.");
  }

  updateQuantity(event: { index: number, quantity: number }) {
    const productItem = this.productSales[event.index];
    if (productItem) {
      productItem.quantity = event.quantity;
      this.selectedItemsMap.set(productItem.product, event.quantity);
      this.selectedItemsMap = new Map(this.selectedItemsMap);
    }
  }

  addItem(event: { item: Product, quantity: number, unitPrice: number }) {
    const index = this.productSales.findIndex(p => p.product.id === event.item.id);

    if (index !== -1) {
      this.productSales[index].quantity += event.quantity;
      this.selectedItemsMap.set(event.item, this.productSales[index].quantity);
    } else {
      const productItem: ProductItem = {
        id: null,
        product: event.item,
        quantity: event.quantity,
        unitPrice: event.unitPrice
      };
      this.productSales.push(productItem);
      this.selectedItemsMap.set(event.item, event.quantity);
    }
    this.selectedItemsMap = new Map(this.selectedItemsMap);
  }

  removeItem(index: number) {
    const removedProduct = this.productSales[index]?.product;

    if (removedProduct) {
      this.productSales.splice(index, 1);
      this.selectedItemsMap.delete(removedProduct);
      this.selectedItemsMap = new Map(this.selectedItemsMap);
    }
  }

  proceedToPayment($event: any) {
    this.total = $event
    this.showPayment = true;
  }
  cancelPayment() {
    this.showPayment = false;
  }
  confirmPayment($event: { method: string, change?: number }) {
    const order = {
      customerId: 1,
      productOrders: this.productSales.map(productItem => ({
        quantity: productItem.quantity,
        unitPrice: productItem.unitPrice,
        productId: productItem.product.id
      })),
      paidAmount: $event.change,
      totalAmount: this.total,
      paymentMethod: $event.method,
      description: ''
    }

    console.log(order);
    
    
    this.orderService.save(order).subscribe({
      next:()=>{
        this.showPayment = false;
        this.message.show('Pagamento confirmado!', 'success')
      },
      error:()=>{
        this.message.show('Erro ao realizar pagamento!','error')
      }
    });
  }
}
