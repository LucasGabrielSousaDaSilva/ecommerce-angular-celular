import { ItemCarrinho } from "./item-carrinho.model";

export interface Venda {
    id?: number;
    idCliente: number;
    dataPedido?: string;
    valorTotal?: string;
    itens: ItemCarrinho[];
    statusPagamento?: string;
    statusPedido?: string;
}
