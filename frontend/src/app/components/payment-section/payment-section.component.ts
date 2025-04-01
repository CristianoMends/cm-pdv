import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentMethod } from "../../interface/PaymentMethod";
import { MessageComponent } from "../../shared/message/message.component";

@Component({
  selector: 'app-payment-section',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent],
  templateUrl: './payment-section.component.html',
  styleUrl: './payment-section.component.css'
})
export class PaymentSectionComponent {
  @Input() total: number = 0;
  @Output() confirmPayment = new EventEmitter<{ method: string, change?: number }>();
  @Output() cancelPayment = new EventEmitter<void>();
  @ViewChild('messageComp') message!: MessageComponent;
  paymentMethod: string = 'MONEY';
  receivedAmount?: number = undefined;
  change: number = 0;

  calculateChange() {
    if (this.paymentMethod === 'MONEY') {
      this.change = this.receivedAmount! - this.total;
    } else {
      this.change = 0;
    }
  }

  confirm() {
    if (this.paymentMethod === 'MONEY' && this.receivedAmount! < this.total) {
      this.message.show('Valor insuficiente para pagamento!')
      return;
    }
    this.confirmPayment.emit({ method: this.paymentMethod, change: this.change });
  }

  cancel() {
    this.cancelPayment.emit();
  }
}
