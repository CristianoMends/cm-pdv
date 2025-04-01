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
  @Input() private _message: string = '';
  @Input() private _messageType: string = 'info';
  @Input() private _buttonLabel = 'OK';
  @Output() okClicked = new EventEmitter<void>();
  containerVisible = false;

  get message(): string { return this._message; }
  get messageType(): string { return this._messageType; }
  get buttonLabel(): string { return this._buttonLabel; }

  show(): void;
  show(message: string): void;
  show(message: string, messageType: string): void;
  show(message: string, messageType: string, buttonLabel:string): void;

  show(message?: string, messageType?: string, buttonLabel?:string): void {

    if (message !== undefined) {
      this._message = message;
    }
    if (messageType !== undefined) {
      this._messageType = messageType;
    }
    if (buttonLabel !== undefined) {
      this._buttonLabel = buttonLabel;
    }
    this.containerVisible = true;
  }

  hide(): void {
    this.containerVisible = false;
    this.okClicked.emit();
  }
}
