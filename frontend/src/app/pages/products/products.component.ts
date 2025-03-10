import { Component, NgModule, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { StockComponent } from "../../components/stock/stock.component";
import { StockService } from '../../service/stock.service';
import Stock from '../../interface/Stock';
import { MessageComponent } from "../../shared/message/message.component";
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { NgIf } from '@angular/common';
import { View } from 'electron';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  standalone: true,
  providers: [StockService],
  imports: [HeaderComponent, SideMenuComponent, StockComponent, MessageComponent, LoadingSpinnerComponent, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private stockService: StockService,private titleService: Title) {}
  
    isLoading = false;
    stockList: Stock[] = [];
    @ViewChild('messageComp') messageComp!: MessageComponent;
    
    ngOnInit(): void {
    this.titleService.setTitle( 'CMPDV - Produtos' );
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
            this.messageComp.show();
          }
        });
      }
    });
  }

}
