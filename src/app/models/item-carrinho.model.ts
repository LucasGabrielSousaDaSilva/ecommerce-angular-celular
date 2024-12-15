export interface ItemCarrinho {
    id: number;
    nome: string;
    quantidade: number;
    preco: number;
    subTotal?: number;
    imageUrl?: string;
}
