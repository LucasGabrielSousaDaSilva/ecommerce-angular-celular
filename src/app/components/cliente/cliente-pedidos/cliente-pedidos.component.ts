import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../../services/carrinho.service';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-cliente-pedidos',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, MatProgressSpinnerModule,
    CommonModule, NgFor
  ],
  templateUrl: './cliente-pedidos.component.html',
  styleUrls: ['./cliente-pedidos.component.css']
})
export class ClientePedidosComponent implements OnInit {
  pedidos: any[] = [];
  loading: boolean = true;
  usuarioLogado: any;

  constructor(private carrinhoService: CarrinhoService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsuarioLogado().subscribe((usuario) => {
      this.usuarioLogado = usuario;
      if (this.usuarioLogado) {
        this.carregarPedidos();
      } else {
        this.loading = false;
      }
    });
  }

  carregarPedidos(): void {
    this.carrinhoService.pedidosRealizados(this.usuarioLogado.id).subscribe({
      next: (data) => {
        this.pedidos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
        this.loading = false;
      }
    });
  }

  verDetalhesPedido(pedidoId: number): void {
    console.log(`Visualizar detalhes do pedido ID: ${pedidoId}`);
  }

  cancelarPedido(pedidoId: number): void {
    this.carrinhoService.cancelarPedido().subscribe({
      next: () => {
        console.log(`Pedido ID ${pedidoId} cancelado com sucesso!`);
        this.carregarPedidos();
      },
      error: (err) => {
        console.error('Erro ao cancelar pedido:', err);
      }
    });
  }
}