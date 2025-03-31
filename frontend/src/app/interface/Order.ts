import { Customer } from "./Customer";
import { PaymentMethod } from "./PaymentMethod";
import ProductItem from "./ProductItem";

export interface Order {
  id: number;  // ID do pedido
  deliveryStatus: any;  // Status da entrega
  paymentStatus: any;  // Status do pagamento
  paidAmount: number;  // Valor recebido
  totalAmount: number;  // Valor total
  balance: number;  // Saldo restante
  paymentMethod: PaymentMethod;  // Método de pagamento
  createdAt: string;  // Data de criação do pedido (ISO 8601 string)
  finishedAt: string | null;  // Data de finalização do pedido (pode ser nula)
  canceledAt: string | null;  // Data de cancelamento (pode ser nula)
  description: string | null;  // Descrição ou observações
  customer: Customer;  // Dados do cliente
  deliveryPerson: any;  // Dados do entregador
  productOrders: ProductItem[];  // Lista de produtos do pedido
}


