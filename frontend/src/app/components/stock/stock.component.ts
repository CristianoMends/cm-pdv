import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import Stock from '../../interface/Stock';
import Product from '../../interface/Product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock',
  standalone: true,
  providers: [DatePipe],
  imports: [DatePipe, CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  @Input() stockList: Stock[] = [];

  categories = [
    { id: 1, name: 'Bebidas' },
    { id: 2, name: 'Alimentos' },
    { id: 3, name: 'Limpeza' },
    { id: 4, name: 'Beleza' }
    // outras categorias que você queira adicionar
  ];

  addNewCategory = false;  // Controle para mostrar/ocultar o campo de nova categoria
  newCategoryName = '';    // Variável para armazenar o nome da nova categoria

  addNewCategoryFunction() {
    if (this.newCategoryName) {
      const newCategory = {
        id: this.categories.length + 1,  // Aqui, um id simples é atribuído, mas você pode gerar um id único
        name: this.newCategoryName
      };
      this.categories.push(newCategory);  // Adiciona a nova categoria à lista
      this.newProduct.category = newCategory;  // Define o id da nova categoria no modelo
      this.newCategoryName = '';  // Limpa o campo de nova categoria
      this.addNewCategory = false;  // Fecha o campo de nova categoria após adicionar
    }
  }

  // Função chamada quando a opção "Adicionar nova categoria..." é selecionada
  onCategoryChange(value: string | number) {
    if (value === 'new') {
      this.addNewCategory = true;  // Exibe o campo para adicionar nova categoria
      console.log(value);  // Log para verificação
    } else {
      this.addNewCategory = false;  // Se uma categoria existente for selecionada, oculta o campo
      console.log(value);  // Log para verificação
    }
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
    line: { id: 0, name: '' },
    ncm: '',
    image: ''
  };

  addProduct(): void {
    // Adicionar novo produto à lista
    const newStock: Stock = {
      id: this.stockList.length + 1,
      initialQuantity: 0,
      totalEntries: 0,
      totalWithdrawals: 0,
      currentQuantity: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      product: { ...this.newProduct }
    };
    this.stockList.push(newStock);

    // Limpar os campos do formulário após o envio
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
      line: { id: 0, name: '' },
      ncm: '',
      image: ''
    };
  }

}
