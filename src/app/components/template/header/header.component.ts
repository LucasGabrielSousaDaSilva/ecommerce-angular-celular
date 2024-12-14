import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatBadge } from '@angular/material/badge';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatIcon, MatIconButton, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();

  constructor(private sidebarService: SidebarService,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.subscription.add(this.authService.getUsuarioLogado().subscribe(
      usuario => this.usuarioLogado = usuario
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clickMenu() {
    this.sidebarService.toggle();
  }

  logout() {
    this.authService.removeToken();
    this.authService.removeUsuarioLogado();
  }
}
