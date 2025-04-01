import SaleItem from "./SaleItem";

export default interface ViewSale {
    id: number;
    items: SaleItem[]
    paymentMethod: string;
    date: Date;
    total: number;
}