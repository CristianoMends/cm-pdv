import Product from './Product';

export default interface Stock {
  id: number | null;
  totalEntries: number;
  totalWithdrawals: number;
  currentQuantity: number;
  createdAt: string;  
  updatedAt: string;  
  product: Product;   
}
