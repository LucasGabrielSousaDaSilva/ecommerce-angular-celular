import { Celular } from "./celular.model";
import { ItemCarrinho } from "./item-carrinho.model";

export interface Venda {
    celulares: ItemCarrinho[];
    formaPagamento: string;
}
