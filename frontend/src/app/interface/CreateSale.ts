
export default interface CreateSale {
    itens: SaleItem[];
    paymentMethod: 'PIX' | 'DEBIT' | 'CREDIT' | 'MONEY';
}

export interface SaleItem {
    item: {
      id: number;
    };
    quantity: number;
  }
  
  