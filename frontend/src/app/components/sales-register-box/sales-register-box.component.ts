import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { MessageComponent } from "../../shared/message/message.component";
import { ItemSelectionComponent } from "../item-selection/item-selection.component";
import Product from '../../interface/Product';
import { StockService } from '../../service/stock.service';
import Stock from '../../interface/Stock';
import { SaleSummaryComponent } from "../sale-summary/sale-summary.component";
import ProductItem from '../../interface/ProductItem';

@Component({
  selector: 'app-sales-register-box',
  standalone: true,
  providers: [StockService],
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, MessageComponent, ItemSelectionComponent, SaleSummaryComponent],
  templateUrl: './sales-register-box.component.html',
  styleUrl: './sales-register-box.component.css'
})
export class SalesRegisterBoxComponent implements OnInit, AfterViewInit {
  constructor(private stockService: StockService) { }

  @ViewChild('messageComp') message!: MessageComponent;

  products: Product[] = [];
  productSales: ProductItem[] = [];
  isLoading: boolean = false;
  selectedItemsMap: Map<Product, number> = new Map<Product, number>();

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

  showMessage(message: string, type: 'success' | 'error') {
    setTimeout(() => {
      if (this.message) {
        this.message.message = message;
        this.message.messageType = type;
        this.message.show();
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
      this.showMessage('Produto removido com sucesso!', 'success');
    }
  }

  proceedToPayment() {

  }
}
