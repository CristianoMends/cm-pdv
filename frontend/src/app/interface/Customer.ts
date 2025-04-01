import { Address } from "./Address";

export interface Customer {
  id: number;  // ID do cliente
  name: string;  // Nome do cliente
  address: Address;  // Endereço do cliente
  phone: string;  // Telefone do cliente
  createdAt: string;  // Data de criação (ISO 8601 string)
  active: boolean;  // Se o cliente está ativo ou não
  cnpj: string;  // CNPJ do cliente
}
