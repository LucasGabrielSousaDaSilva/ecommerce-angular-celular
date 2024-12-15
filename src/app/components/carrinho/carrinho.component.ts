import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/item-carrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
// import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, MatIcon, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, 
    NgFor, NgIf, RouterModule, MatButtonModule, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: ItemCarrinho[] = [];
  carrinhoId: number | undefined;

  constructor(
    private carrinhoService: CarrinhoService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  // ngOnInit(): void {
    // const usuarioLogado = localStorage.getItem('usuario_logado');
    // if (!usuarioLogado) {
    //   this.router.navigateByUrl('/user/login');
    //   return;
    // }

    // const cliente = JSON.parse(usuarioLogado);
    // if (cliente?.id) {
    //   this.carrinhoService.configurarCliente(cliente.id);

    //   this.carrinhoService.obterCarrinho().subscribe({
    //     next: (itens) => {
    //       this.itensCarrinho = itens;
    //       this.recalcularSubtotais();
    //     },
    //     error: (err) => {
    //       console.error('Erro ao carregar o carrinho:', err);
    //     },
    //   });
    // } else {
    //   this.router.navigateByUrl('/user/login');
    // }
  // }

  // fecharPedido(): void {
  //   const usuarioLogado = localStorage.getItem('usuario_logado');
  //   if (!usuarioLogado) {
  //     this.router.navigateByUrl('/user/login');
  //     return;
  //   }

  //   const cliente = JSON.parse(usuarioLogado);
  //   if (cliente?.id) {
  //     this.carrinhoService
  //       .salvarPedido(cliente.id, this.itensCarrinho)
  //       .subscribe({
  //         next: (carrinho) => {
  //           this.carrinhoId = carrinho.id;
  //           alert('Pedido fechado com sucesso!');
  //           this.router.navigateByUrl('/user/finalizar-venda');
  //         },
  //         error: (err) => {
  //           console.error('Erro ao fechar o pedido:', err);
  //         },
  //       });
  //   }
  // }


  // removerItem(index: number): void {
  //   this.itensCarrinho.splice(index, 1);
  //   this.recalcularSubtotais();
  // }

  // limparCarrinho(): void {
  //   this.itensCarrinho = [];
  //   this.recalcularSubtotais();
  // }

  // calcularTotal(): number {
  //   const total = this.itensCarrinho.reduce(
  //     (soma, item) => soma + (item.subTotal ?? 0),
  //     0
  //   );

  //   return total;
  // }

  // recalcularSubtotais(): void {
  //   this.itensCarrinho.forEach((item) => {
  //     item.subTotal = (item.preco ?? 0) * item.quantidade;
  //   });
  // }

  // alterarQuantidade(index: number, delta: number): void {
  //   const item = this.itensCarrinho[index];
  //   if (item) {
  //     item.quantidade += delta;
  //     if (item.quantidade < 1) {
  //       item.quantidade = 1;
  //     }
  //     this.recalcularSubtotais();
  //   }
  // }

    recalcularSubtotais(): void {
    this.itensCarrinho.forEach((item) => {
      item.subTotal = (item.preco ?? 0) * item.quantidade;
    });
  }

  ngOnInit(): void{
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.itensCarrinho = itens;
    });

    this.carrinhoService.obterCarrinho().subscribe({
      next: (itens) => {
        this.itensCarrinho = itens;
        this.recalcularSubtotais();
      }
    });
  }

  removerItem(item: ItemCarrinho){
    this.carrinhoService.removerItem(item);
  }

  calcularTotal(): number{
    return this.itensCarrinho.reduce((total, item) => total + item.quantidade * item.preco, 0)
  }

  atualizarQuantidade(item: ItemCarrinho) {
    this.carrinhoService.atualizarQuantidade(item);
  }

  finalizarCompra() {
    if (this.itensCarrinho.length > 0) {
      this.carrinhoService.limparCarrinho();
      this.router.navigate(['/user/finalizar-venda']);
    } else {
      alert('O carrinho está vazio.');
    }
  }
}
