import Product from "./Product";

export default interface ProductItem {
  id: number | null;
  product: Product;
  quantity: number;
  unitPrice: number;
}