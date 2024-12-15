import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatBadge } from '@angular/material/badge';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { CelularService } from '../../services/celular.service';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, NgIf, MatIcon, MatIconButton,
    RouterModule, MatMenuModule, MatFormFieldModule, MatInputModule,
    FormsModule, MatSelectModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();

  // Controladores de pesquisa
  exibirPesquisa = false; // Controla a exibição do campo de pesquisa
  termoPesquisa: string = ''; // Guarda o termo pesquisado
  filtroSelecionado: string = '';

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private celularService: CelularService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Assina mudanças no estado do usuário logado
    this.subscription.add(
      this.authService
        .getUsuarioLogado()
        .subscribe((usuario) => (this.usuarioLogado = usuario))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clickMenu() {
    this.sidebarService.toggle();
  }

  deslogar() {
    this.authService.removeToken();
    this.authService.removeUsuarioLogado();
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  // Alterna a exibição do campo de pesquisa
  togglePesquisa() {
    this.exibirPesquisa = !this.exibirPesquisa;
    if (!this.exibirPesquisa) {
      this.termoPesquisa = ''; // Limpa o termo de pesquisa
    }
  }

  verCarrinho() {
    this.router.navigate(['/carrinho']);
  }

  meuPerfil() {
    this.router.navigate(['/meuPerfil']);
  }

  meusPedidos(){
    this.router.navigate(['/meuPedido']);
  }

  // Função de pesquisa que chama os métodos do serviço
  pesquisar(): void {
    if (!this.filtroSelecionado || !this.termoPesquisa.trim()) {
      alert('Por favor, preencha o termo de pesquisa e selecione um tipo.');
      return;
    }

    if (this.filtroSelecionado === 'celular') {
      this.router.navigate(['/celular'], {
        queryParams: { termo: this.termoPesquisa },
      });
    } else {
      alert('Por favor, selecione um tipo de pesquisa.');
    }

    // Após pesquisar, fecha o campo de pesquisa
    this.exibirPesquisa = false;
    this.termoPesquisa = ''; // Opcional: limpa o campo de pesquisa após a execução
  }
}
