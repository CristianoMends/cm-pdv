import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import Stock from '../../interface/Stock';
import Product from '../../interface/Product';
import { FormsModule } from '@angular/forms';
import { ProductCategory } from '../../interface/ProductCategory';

@Component({
  selector: 'app-stock',
  standalone: true,
  providers: [DatePipe],
  imports: [DatePipe, CommonModule, FormsModule],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  @Input() stockList: Stock[] = [];
  @Input() productList: Product[] = [];
  @Input() categories: ProductCategory[] = [];
  @Output() addProductToStock = new EventEmitter<any>();
  @Output() addNewProduct = new EventEmitter<any>();
  @Output() addNewCategory = new EventEmitter<any>();
  newProductImageUrl: string = '';

  isAddNewCategory = false;
  newCategoryName = '';
  file: any;

  addNewCategoryFunction() {
    if (this.newCategoryName.trim()) {
      const newCategory: ProductCategory = { id: this.categories.length + 1, name: this.newCategoryName }; 

      this.categories.push(newCategory); 
      this.addNewCategory.emit(this.newCategoryName); 
      this.isAddNewCategory = false; 
    }
  }

  
  onCategoryChange(value: string | number) {
    if (value === 'new') {
      this.isAddNewCategory = true;  
    } else {
      this.isAddNewCategory = false;  
    }
  }

  onFileChange(event: any) {
    event.preventDefault();
    this.file = event.target.files[0];
  }

  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    cost: 0,
    unit: '',
    brand: '',
    category: { id: 0, name: '' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    active: true,
    ncm: '',
    image: ''
  };

  addProduct(): void {
            
    const send = {
      name: this.newProduct.name,
      price: this.newProduct.price,
      cost: this.newProduct.cost,
      unit: this.newProduct.unit,
      brand: this.newProduct.brand,
      categoryId: this.newProduct.category.id,
      ncm: this.newProduct.ncm
    }

    const image = this.file;

    this.addNewProduct.emit({ send, image });

    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      cost: 0,
      unit: '',
      brand: '',
      category: { id: 0, name: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      active: true,
      ncm: '',
      image: ''
    };
  }

  newStock: any = {
    productId: 0,
    quantity: 0,
  }



  addStock(): void {
    this.addProductToStock.emit(this.newStock);
  }

}
