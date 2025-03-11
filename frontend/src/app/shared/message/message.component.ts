import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgIf],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() messageType: string = 'info';
  @Output() okClicked = new EventEmitter<void>();
  

  @ViewChild('container') container!: ElementRef;

  containerVisible = false; 

  show(): void {
    this.containerVisible = true;
  }

  hide(): void {
    this.containerVisible = false;
    this.okClicked.emit();
  }
}
