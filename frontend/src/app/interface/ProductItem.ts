import Product from "./Product";

export default interface ProductItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}