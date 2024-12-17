import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemCarrinho } from '../../../models/item-carrinho.model';


@Component({
  selector: 'app-cliente-pedidos',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './cliente-pedidos.component.html',
  styleUrls: ['./cliente-pedidos.component.css']
})
export class ClientePedidosComponent implements OnInit {
  loading: boolean = false;
  pedidos: ItemCarrinho[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.buscarPedidos();
  }

  buscarPedidos(): void {
    this.loading = true;
    this.clienteService.getPedidosCliente().subscribe({
      next: (pedidos: ItemCarrinho[]) => {
        this.pedidos = pedidos;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar pedidos:', err);
        this.loading = false;
      }
    });
  }

  verDetalhesPedido(id: number): void {
    console.log('Ver detalhes do pedido:', id);
    // Lógica para exibir ou redirecionar para os detalhes do pedido
  }

  cancelarPedido(id: number): void {
    console.log('Cancelar pedido:', id);
    // Lógica para cancelar o pedido
  }

}
