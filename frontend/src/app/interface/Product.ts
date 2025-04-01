import { ProductCategory } from "./ProductCategory";

export default interface Product {
    /**
     * Identificador único do produto
     * Exemplo: 1
     */
    id: number;

    /**
     * Nome do produto
     * Exemplo: "Água Mineral"
     * Máximo: 50 caracteres
     */
    name: string;

    /**
     * Preço de venda do produto
     * Exemplo: 50.00
     */
    price: number;

    /**
     * Preço de custo do produto
     * Exemplo: 20.00
     */
    cost: number;

    /**
     * Unidade de medida do produto
     * Exemplo: "ml"
     * Máximo: 20 caracteres
     */
    unit: string;

    /**
     * Marca do produto
     * Exemplo: "Crystal"
     * Máximo: 30 caracteres
     */
    brand: string;

    /**
     * Categoria do produto
     * Exemplo: "Bebidas"
     * Máximo: 30 caracteres
     */
    category: ProductCategory;

    /**
     * Data de registro do produto
     * Exemplo: "2024-12-19"
     */
    createdAt: string;  // ISO string (data e hora)

    /**
     * Data de atualização do produto
     * Exemplo: "2024-12-29"
     */
    updatedAt: string;  // ISO string (data e hora)

    /**
     * Se o produto não está ativo, então foi deletado
     * Exemplo: true
     */
    active: boolean;

    /**
     * A Nomenclatura Comum do Mercosul (NCM)
     * Exemplo: "2201.10.00"
     */
    ncm: string;

    /**
     * Imagem do produto
     */
    image: string;
}


