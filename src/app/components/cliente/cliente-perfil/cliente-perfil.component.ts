import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { ClienteService } from '../../../services/cliente.service';
import { Usuario } from '../../../models/usuario.model';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente-perfil',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDivider,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './cliente-perfil.component.html',
  styleUrl: './cliente-perfil.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientePerfilComponent implements OnInit {
  formGroup: FormGroup;
  usuarioLogado: any;
  endereco: any;
  usuario: Usuario | null = null;
  cliente: Cliente | null = null;
  private subscription = new Subscription();
  fileName: string = '';
  hide = signal(true);

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private clienteService: ClienteService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: [''],
      email: [''],
      // Adicione outros campos conforme necessário
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.getUsuarioLogado().subscribe((usuario) => {
        this.usuarioLogado = usuario;
        if (this.usuarioLogado) {
          this.clienteService.findById(this.usuarioLogado.id).subscribe((cliente) => {
            this.cliente = cliente;
            this.initializeForm(cliente);
          });
        }
      })
    );
  }

  initializeForm(cliente: Cliente): void {
    this.formGroup = this.formBuilder.group({
      nome: [cliente.nome || '', Validators.required],
      cep: [cliente.cep || '', Validators.required],
      cpf: [cliente.cpf || '', Validators.required],
      login: [cliente.login || '', Validators.required],
      senha: [cliente.senha || '', Validators.required],
      logradouro: [cliente.logradouro || '', Validators.required],
      complemento: [cliente.complemento || ''],
      bairro: [cliente.bairro || '', Validators.required],
      localidade: [cliente.localidade || '', Validators.required],
      uf: [cliente.uf || '', Validators.required]
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
