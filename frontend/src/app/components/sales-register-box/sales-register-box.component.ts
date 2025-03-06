import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { MessageComponent } from "../message/message.component";
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
export class SalesRegisterBoxComponent {
  constructor(
    private stockService: StockService) {
      
    }
    @ViewChild('message') message!: MessageComponent;
  products: Product[] = [];
  productSales: ProductItem[] = [];
  isLoading: boolean = false;
  selectedItemsMap: Map<Product, number> = new Map<Product, number>();
  
  
  ngOnInit(): void {

    this.loadProductsOnStock();
  }

  loadProductsOnStock() {
    this.stockService.getStock().subscribe({
      next: (stock: Stock[]) => {

        stock.forEach((stock) => {
          this.products.push(stock.product);

        });
      },
      error: (error) => {
        console.error('Erro ao carregar os produtos:', error);
      }
    });
  }

updateQuantity(event: { index: number, quantity: number }) {
  const productItem = this.productSales[event.index];
  if (productItem) {

    productItem.quantity = event.quantity;
    const product = productItem.product;
    this.selectedItemsMap.set(product, event.quantity);

    this.selectedItemsMap = new Map(this.selectedItemsMap);
  }
}



addItem(event: { item: Product, quantity: number, unitPrice: number }) {
  // Verifica se o produto já está na lista (usando, por exemplo, o id do produto)
  const index = this.productSales.findIndex(
    p => p.product.id === event.item.id
  );

  if (index !== -1) {
    // Se já existe, atualiza a quantidade
    this.productSales[index].quantity += event.quantity;
    // Atualiza o map também
    this.selectedItemsMap.set(event.item, this.productSales[index].quantity);
    // Força a detecção de mudança criando uma nova instância do Map
    this.selectedItemsMap = new Map(this.selectedItemsMap);
  } else {
    // Se não existe, adiciona um novo item
    const productItem: ProductItem = { 
      product: event.item, 
      quantity: event.quantity, 
      unitPrice: event.unitPrice 
    };
    this.productSales = [...this.productSales, productItem];
    // Atualiza o Map
    const currentQuantity = this.selectedItemsMap.get(event.item) || 0;
    this.selectedItemsMap.set(event.item, currentQuantity + event.quantity);
    this.selectedItemsMap = new Map(this.selectedItemsMap);
  }
}

  
  removeItem(index: number) {
    this.productSales.splice(index, 1);
  }

  proceedToPayment() {
    this.message.message = 'Venda realizada com sucesso!';
    this.message.showContainer();
  }

}
