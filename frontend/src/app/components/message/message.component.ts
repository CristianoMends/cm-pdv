import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Injectable, Input, Output, ViewChild, inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgIf],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() title: string;
  @Input() message: string;

  @ViewChild('container') container!:ElementRef;

  @Output() okClicked = new EventEmitter<void>();
  containerVisible = false; 
  
  constructor() {
    this.title = '';
    this.message = '';
  }

  onOkClick(): void {
    this.hideContainer();
  }

  hideContainer(): void {
    this.containerVisible = false;
  }
  showContainer(){
    this.containerVisible = true;
  }
}


