import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Product from '../../interface/Product';

@Component({
  selector: 'app-item-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-selection.component.html',
  styleUrl: './item-selection.component.css'
})
export class ItemSelectionComponent {
  @Input() items: Product[] = [];
  @Output() addSale = new EventEmitter<{ item: Product; quantity: number, unitPrice: number }>();
  @Input() selectedItemsMap: Map<Product, number> = new Map<Product, number>();

  searchTerm: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  get filteredItems(): Product[] {
    return this.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesMinPrice = this.minPrice === null || item.price >= this.minPrice;
      const matchesMaxPrice = this.maxPrice === null || item.price <= this.maxPrice;
      return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });
  }

  selectItem(item: Product) {
    this.addToSale(item,1,item.price);
  }

  private addToSale(product:Product,quantity: number, unitPrice: number) {
      this.addSale.emit({ item: product, quantity, unitPrice });

      this.selectedItemsMap.set(product, quantity);
      
      this.selectedItemsMap = new Map(this.selectedItemsMap);
  }

  getItemQuantity(item: Product): number {
    return this.selectedItemsMap.get(item) || 0;
  }
  
}
