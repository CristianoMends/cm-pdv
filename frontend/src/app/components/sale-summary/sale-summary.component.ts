import { Component, Input, Output, EventEmitter } from '@angular/core';
import SaleItem from '../../interface/SaleItem';
import { CommonModule } from '@angular/common';
import ProductItem from '../../interface/ProductItem';

@Component({
  selector: 'app-sale-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sale-summary.component.html',
  styleUrl: './sale-summary.component.css'
})
export class SaleSummaryComponent {
  @Input() productSales: ProductItem[] = [];
  @Output() removeItem = new EventEmitter<number>();
  @Output() goToPayment = new EventEmitter<void>();
  @Output() updateItemQuantity = new EventEmitter<{ index: number, quantity: number }>();

  get subtotal(): number {
    return this.productSales.reduce((total, saleItem) => total + saleItem.product.price * saleItem.quantity, 0);
  }

  remove(index: number) {
    this.removeItem.emit(index);
  }

  proceedToPayment() {
    this.goToPayment.emit();
  }

  updateQuantity(index: number, event: any) {
    const quantity = parseInt(event.target.value, 10);

    if (isNaN(quantity) || quantity < 1) {
      return; // Se a quantidade for inválida ou menor que 1, não atualize
    }

    // Atualiza a quantidade do item no array de productSales
    this.productSales[index].quantity = quantity;

    // Emite a atualização da quantidade para o componente pai
    this.updateItemQuantity.emit({ index, quantity });
  }

}
