import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Venda } from '../models/venda.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private baseUrl = 'http://localhost:8080/venda';

  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  private itensCarrinho: Map<number, ItemCarrinho[]> = new Map();
  private clienteAtualId: number | null = null;

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
    const carrinhoArmazenado = localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(carrinhoArmazenado);
  }

    // Configurar cliente logado
    configurarCliente(idCliente: number): void {
      this.clienteAtualId = idCliente;
  
      if (!this.itensCarrinho.has(idCliente)) {
        this.itensCarrinho.set(idCliente, []);
      }
  
      this.carrinhoSubject.next(this.itensCarrinho.get(idCliente)!);
      this.getCarrinho(idCliente);
    }

    getCarrinho(idCliente: number): void {
      const token = localStorage.getItem('token'); // Obter token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      this.http.get<any>(`${this.baseUrl}/carrinho/${idCliente}`, { headers }).subscribe({
        next: (pedido) => {
          if (pedido?.itens && pedido.itens.length > 0) {
            const itens = pedido.itens.map((item: any) => ({
              id: item.id,
              nome: item.nome,
              preco: item.preco,
              quantidade: item.quantidade,
              subTotal: item.subTotal,
            }));
            this.itensCarrinho.set(idCliente, itens);
            this.carrinhoSubject.next(itens);
          } else {
            this.itensCarrinho.set(idCliente, []);
            this.carrinhoSubject.next([]);
          }
        },
        error: (err) => {
          console.error('Erro ao carregar carrinho do backend:', err);
        },
      });
    }

  create(venda: Venda): Observable<Venda> {
    console.log('Venda criada:', venda);
    return this.http.post<Venda>(this.baseUrl, venda);
  }

  // getCarrinho(idCliente: number): void {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.error('Token não encontrado. Faça login novamente.');
  //     return;
  //   }

  adicionar(ItemCarrinho: ItemCarrinho) : void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemExistente = carrinhoAtual.find(item => item.id === ItemCarrinho.id);

    // if (this.clienteAtualId === null) {
    //   throw new Error('Cliente não configurado. Por favor, configure o cliente antes de adicionar itens.');
    // }

    if (itemExistente) {
      itemExistente.quantidade += ItemCarrinho.quantidade || 1;
    }else{
      carrinhoAtual.push(ItemCarrinho);
    }

    this.carrinhoSubject.next(carrinhoAtual);
    localStorage.setItem(`carrinho`, JSON.stringify(carrinhoAtual));
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

  obterCarrinho(): Observable<ItemCarrinho[]> {
    return this.carrinhoSubject.asObservable();
  }

  salvarPedido(idCliente: number, itens: ItemCarrinho[]): Observable<any> {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // ${token}
      const body = {
        idCliente,
        itens: itens.map((item) => ({
          id: item.id,
          quantidade: item.quantidade,
        })),
      };
  
      return this.http.post(`${this.baseUrl}`, body, {headers}); // , { headers }
    } 

  atualizarCarrinho(itens: ItemCarrinho[]): void {
    // if (this.clienteAtualId === null) {
    //   throw new Error('Cliente não configurado.');
    // }
    this.carrinhoSubject.next(itens);
  }

  pedidosRealizados(idCliente: number): Observable<any> {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   throw new Error('Token não encontrado. Faça login novamente.');
    // }
    const headers = new HttpHeaders().set('Authorization', `Bearer `); // ${token}
    return this.http.get(`${this.baseUrl}/busca/cliente/${idCliente}`, { headers });
  }

  cancelarPedido(): Observable<void> {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   throw new Error('Token não encontrado. Faça login novamente.');
    // }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer`);// ${token}
  
    // Realiza a requisição DELETE para o endpoint fornecido
    return this.http.delete<void>(`${this.baseUrl}/search/cancelar-Pedido`, { headers });
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

  // private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  // carrinho$ = this.carrinhoSubject.asObservable();

  // constructor(private localStorageService: LocalStorageService) {
  //   const carrinhoArmazenado = localStorageService.getItem('carrinho') || [];
  //   this.carrinhoSubject.next(carrinhoArmazenado);
  // }

  // removerTudo(): void{
  //   this.localStorageService.removeItem('carrinho');
  //   // window.localStorage.reload();
  // }

  // removerItem(itemCarrinho: ItemCarrinho) : void{
  //   const carrinhoAtual = this.carrinhoSubject.value;
  //   const carrinhoAtualizado = carrinhoAtual.filter(item => item.id !== itemCarrinho.id);

  //   this.carrinhoSubject.next(carrinhoAtualizado);
  // }

  // obter() : ItemCarrinho[]{
  //   return this.carrinhoSubject.value;
  // }

  //   obterCarrinho(): Observable<ItemCarrinho[]> {
  //   return this.carrinhoSubject.asObservable();
  // }

  // atualizarQuantidade(item: ItemCarrinho): void {
  //   const carrinhoAtual = this.carrinhoSubject.value;
  //   const itemExistente = carrinhoAtual.find(i => i.id === item.id);
  
  //   if (itemExistente) {
  //     itemExistente.quantidade = item.quantidade;
  //   }
  
  //   this.carrinhoSubject.next(carrinhoAtual);
  // }
  
  // limparCarrinho(): void {
  //   this.carrinhoSubject.next([]);
  //   this.atualizarArmazenamentoLocal();
  // }

  // private atualizarArmazenamentoLocal(): void{
  //   localStorage.setItem('carrinho' , JSON.stringify(this.carrinhoSubject.value));
  // }
}
