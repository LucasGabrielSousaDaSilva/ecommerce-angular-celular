import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../../services/carrinho.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ClienteService } from '../../../services/cliente.service';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemCarrinho } from '../../../models/item-carrinho.model';
import { FormaPagamento } from '../../../models/formaPagamento';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-realizar-pagamento',
  standalone: true,
  imports: [
    FormsModule, CommonModule, MatCardModule, MatButtonModule, MatRadioModule,
    MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatOptionModule,
    MatInputModule, MatLabel, NgIf, NgFor, MatOptionModule, RouterLink
  ],
  templateUrl: './realizar-pagamento.component.html',
  styleUrls: ['./realizar-pagamento.component.css'],
})
export class RealizarPagamentoComponent implements OnInit {
  currentStep: number = 1; // Controle do passo atual
  totalPedido: number = 0;
  metodoPagamento: number = 0;
  itensCarrinho: ItemCarrinho[] = [];
  idCliente: number = 1;
  // cartaoCredito: CartaoCredito = {
  //   bandeiraCartao: 0,
  //   cpfTitular: '',
  //   cvc: 0,
  //   nomeImpressaoTitular: '',
  //   numeroCartao: '',
  //   validade: '',
  // };
    usuarioLogado: Usuario | null = null;
    private subscription = new Subscription();

  constructor(
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {

    // this.authService.getClienteIdFromToken().subscribe({
    //   next: (id) => {
    //     this.idCliente = id;
    //   },
    //   error: (err) => {
    //     console.error('Erro ao obter o ID do cliente:', err);
    //     this.snackBar.open('Erro ao obter informações do cliente. Faça login novamente.', 'Fechar', { duration: 3000 });
    //     this.router.navigateByUrl('/login');
    //   }
    // });

    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));

    this.carrinhoService.obterCarrinho().subscribe((itens) => {
      this.itensCarrinho = itens;
      this.calcularTotalPedido();
    });

    // Carregar dados do cliente
    // const usuarioLogado = localStorage.getItem('usuario_logado');
    // if (usuarioLogado) {
    //   this.cliente = JSON.parse(usuarioLogado);
    // } else {
    //   this.router.navigateByUrl('/login');
    // }
  }

  // criarPedido(): {
  //   idCliente: number;
  //   valorTotal: number;
  //   itens: ItemCarrinho[];
  //   formaPagamento: string;
  // } {
  //   return {
  //     idCliente: this.cliente.id,
  //     valorTotal: this.totalPedido,
  //     itens: this.itensCarrinho,
  //     formaPagamento: this.metodoPagamento as FormaPagamento,
  //   };
  // }

  criarPedido(): any {
    return {
      itens: this.itensCarrinho.map(item => ({
        id: item.id,
        quantidade: item.quantidade
      })),
      formaPagamento: this.metodoPagamento
    };
  }

  calcularTotalPedido(): void {
    this.totalPedido = this.itensCarrinho.reduce(
      (total, item) => total + (item.subTotal ?? 0),
      0
    );
  }

  avancar(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  voltar(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  realizarPagamento(): void {
    if (!this.metodoPagamento) {
      alert('Selecione um método de pagamento!');
      return;
    }

    // Realiza o pagamento
    // Exibe a mensagem de sucesso e redireciona
    this.snackBar.open('Pagamento realizado com sucesso!!', 'Fechar', { duration: 3000 });
    this.router.navigateByUrl('/user/acompanharPedido'); // Redireciona

    const pedido = this.criarPedido(); // Cria o pedido com os dados do carrinho

    this.carrinhoService.salvarPedido(this.metodoPagamento, pedido.itens).subscribe({
      next: () => {
        // Exibe a mensagem de sucesso e redireciona
        this.snackBar.open('Pagamento realizado com sucesso!!', 'Fechar', { duration: 3000 });
        this.router.navigateByUrl('/user/acompanharPedido'); // Redireciona
      },
      error: (err) => {
        console.error('Erro ao salvar o pedido:', err);
        this.snackBar.open('Opss... Falha ao realizar o pagamento. Tente novamente', 'Fechar', { duration: 3000 });
      }
    });
  }

  // conferirPagamento(): void {
  //   if (!this.metodoPagamento) {
  //     alert('Selecione um método de pagamento!');
  //     return;
  //   }
  //   const pedido = this.criarPedido(); // Cria o pedido com os dados do carrinho
  //   switch (this.metodoPagamento) {
  //     case 'pix':
  //       this.carrinhoService.subscribe({
  //         next: () => {
  //           this.snackBar.open('Pagamento por pix realizado com sucesso!!', 'Fechar' , {duration: 3000});
  //           this.router.navigateByUrl('/acompanharPedido'); // Redireciona
  //         },
  //         error: (err) => {
  //           console.error('Erro ao processar pagamento via Pix:', err);
  //           this.snackBar.open('Opss... Pagamento por pix falhou. Tente Novamente', 'Fechar' , {duration: 3000});
  //         },
  //       });
  //       break;
  //     // case 'credito':
  //     //   this.carrinhoService.finalizarPedidoCartaoCredito(this.cartaoCredito).subscribe({
  //     //     next: () => {
  //     //       this.snackBar.open('Pagamento por Cartão de Crédito realizado com sucesso!!', 'Fechar' , {duration: 3000});
  //     //       this.router.navigateByUrl('/acompanharPedido'); // Redireciona
  //     //     },
  //     //     error: (err) => {
  //     //       console.error('Erro ao processar pagamento com Cartão de Crédito:', err);
  //     //       this.snackBar.open('Opss... Pagamento por Cartão de Crédito falhou. Tente Novamente', 'Fechar' , {duration: 3000});
  //     //     },
  //     //   });
  //       break;
  //     case 'boleto':
  //       this.carrinhoService..subscribe({
  //         next: () => {
  //           this.snackBar.open('Pagamento por Boleto realizado com sucesso!!', 'Fechar' , {duration: 3000});
  //           this.router.navigateByUrl('/acompanharPedido'); // Redireciona
  //         },
  //         error: (err) => {
  //           console.error('Erro ao processar pagamento com Boleto:', err);
  //           this.snackBar.open('Opss... Pagamento por boleto falhou. Tente Novamente', 'Fechar' , {duration: 3000});
  //         },
  //       });
  //       break;
  //     default:
  //       this.snackBar.open('Opss... Método de pagamento inválido. Tente Novamente', 'Fechar' , {duration: 3000});
  //   }
  // }
}
