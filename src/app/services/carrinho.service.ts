import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const carrinhoArmazenado = localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(carrinhoArmazenado);
  }

  adicionar(ItemCarrinho: ItemCarrinho) : void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemExistente = carrinhoAtual.find(item => item.id === ItemCarrinho.id);

    if (itemExistente) {
      itemExistente.quantidade += ItemCarrinho.quantidade || 1;
    }else{
      carrinhoAtual.push(ItemCarrinho);
    }

    this.carrinhoSubject.next(carrinhoAtual);
  }

  removerTudo(): void{
    this.localStorageService.removeItem('carrinho');
    // window.localStorage.reload();
  }

  removerItem(itemCarrinho: ItemCarrinho) : void{
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.filter(item => item.id !== itemCarrinho.id);

    this.carrinhoSubject.next(carrinhoAtualizado);
  }

  obter() : ItemCarrinho[]{
    return this.carrinhoSubject.value;
  }

  atualizarQuantidade(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemExistente = carrinhoAtual.find(i => i.id === item.id);
  
    if (itemExistente) {
      itemExistente.quantidade = item.quantidade;
    }
  
    this.carrinhoSubject.next(carrinhoAtual);
  }
  
  limparCarrinho(): void {
    this.carrinhoSubject.next([]);
    this.atualizarArmazenamentoLocal();
  }

  private atualizarArmazenamentoLocal(): void{
    localStorage.setItem('carrinho' , JSON.stringify(this.carrinhoSubject.value));
  }
}
