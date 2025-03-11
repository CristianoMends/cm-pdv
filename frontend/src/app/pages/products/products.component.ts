import { AfterViewInit, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { StockComponent } from "../../components/stock/stock.component";
import { StockService } from '../../service/stock.service';
import Stock from '../../interface/Stock';
import { MessageComponent } from "../../shared/message/message.component";
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../../service/product.service';
import Product from '../../interface/Product';
import ProductCategory from '../../interface/Product';
import { FileService } from '../../service/file.service';

@Component({
  selector: 'app-products',
  standalone: true,
  providers: [StockService, ProductService, FileService],
  imports: [HeaderComponent, SideMenuComponent, StockComponent, MessageComponent, LoadingSpinnerComponent, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(
    private stockService: StockService,
    private titleService: Title,
    private productService: ProductService,
    private fileService: FileService
  ) { }

  isLoading = false;
  isDateLoaded = false;
  stockList: Stock[] = [];
  productList: Product[] = [];
  categories: ProductCategory[] = [];

  @ViewChild('stockComp') stockComp!: StockComponent;
  @ViewChild('messageComp') messageComp!: MessageComponent;

  ngOnInit(): void {
    this.titleService.setTitle('CMPDV - Produtos');

    if (this.isDateLoaded) { return; }
    this.loadStock();
    this.loadProducts();
    this.loadCategories();
    this.isDateLoaded = true;
  }

  loadStock() {
    this.isLoading = true;
    this.stockService.getStock().subscribe({
      next: (stockList: Stock[]) => {
        this.stockList = stockList;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        setTimeout(() => {
          if (this.messageComp) {
            this.messageComp.message = 'Erro ao carregar os dados dos produtos. Por favor, tente novamente mais tarde.';
            this.messageComp.messageType = 'error';
            this.messageComp.show();
          }
        });
      }
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (productList: Product[]) => {
        this.productList = productList;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        setTimeout(() => {
          if (this.messageComp) {
            this.messageComp.message = 'Erro ao carregar os dados dos produtos. Por favor, tente novamente mais tarde.';
            this.messageComp.messageType = 'error';
            this.messageComp.show();
          }
        });
      }
    });
  }

  loadCategories() {
    this.isLoading = true;
    this.productService.getCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        setTimeout(() => {
          if (this.messageComp) {
            this.messageComp.message = 'Erro ao carregar os dados dos produtos. Por favor, tente novamente mais tarde.';
            this.messageComp.messageType = 'error';
            this.messageComp.show();
          }
        });
      }
    });
  }

  uploadFile($event: any) {
    this.isLoading = true;
    this.fileService.upload($event).subscribe({
      next: (response: { url: string }) => {
        this.stockComp.newProductImageUrl = response.url;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        setTimeout(() => {
          if (this.messageComp) {
            this.messageComp.message = 'Erro ao fazer upload da imagem. Verifique sua conexão e tente novamente.';
            this.messageComp.messageType = 'error';
            this.messageComp.show();
          }
        });
      }
    });
  }

  addProduct($event: any) {
    this.stockService.addProductToStock($event).subscribe({
      next: (response) => {
        this.loadStock();
        setTimeout(() => {
          if (this.messageComp) {
            
            this.loadStock();
            this.stockList = [...this.stockList];

            this.messageComp.message = 'Produto adicionado ao estoque com sucesso!';
            this.messageComp.messageType = 'success';
            this.messageComp.show();
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        setTimeout(() => {
          if (this.messageComp) {
            this.messageComp.message = 'Erro ao adicionar o produto ao estoque.';
            this.messageComp.messageType = 'error';
            this.messageComp.show();
          }
        });
      }
    });
  }

  addNewCategory($event: any) {
    this.productService.addCategory($event).subscribe({
      next: (response) => {
        this.loadProducts();
        setTimeout(() => {
          if (this.messageComp) {
            this.messageComp.message = 'Categoria adicionada com sucesso!';
            this.messageComp.messageType = 'success';
            this.messageComp.show();
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        setTimeout(() => {
          if (this.messageComp) {
            this.messageComp.message = 'Erro ao adicionar a categoria.';
            this.messageComp.messageType = 'error';
            this.messageComp.show();
          }
        });
      }
    });
  }

  addNewProduct($event: any) {
    this.productService.addProduct($event.send, $event.image).subscribe({
      next: (response) => {
        this.loadProducts();
        setTimeout(() => {
          if (this.messageComp) {
            this.messageComp.message = 'Produto cadastrado com sucesso!';
            this.messageComp.messageType = 'success';
            this.messageComp.show();
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        setTimeout(() => {
          if (this.messageComp) {
            this.messageComp.message = 'Erro ao cadastrar o produto. Verifique os dados e tente novamente.';
            this.messageComp.messageType = 'error';
            this.messageComp.show();
          }
        });
      }
    });
  }
}
