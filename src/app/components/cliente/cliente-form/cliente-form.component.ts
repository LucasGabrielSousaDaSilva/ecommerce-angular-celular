import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatCardActions } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTable } from '@angular/material/table';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, ReactiveFormsModule, 
    MatCardActions, MatCardContent, MatCard, MatIcon, MatToolbar, RouterLink],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        nome:['', Validators.required],
        cep:['', Validators.required],
        cpf:['' , Validators.required],
        login:['', Validators.required],
        senha:['', Validators.required],
        logradouro:['', Validators.required],
        complemento:['', Validators.required],
        bairro:['', Validators.required],
        localidade:['', Validators.required],
        uf:['', Validators.required],
      }) 
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    const cliente: Cliente = this.activatedRoute.snapshot.data['cliente'];
  
    this.formGroup = this.formBuilder.group({
      nome: [(cliente && cliente.nome) ? cliente.nome : null],
      cep: [(cliente && cliente.cep) ? cliente.cep : null],
      cpf: [(cliente && cliente.cpf) ? cliente.cpf : null],
      login: [(cliente && cliente.login) ? cliente.login : null],
      senha: [(cliente && cliente.senha) ? cliente.senha : null],
      logradouro: [(cliente && cliente.logradouro) ? cliente.logradouro : null],
      complemento: [(cliente && cliente.complemento) ? cliente.complemento : null],
      bairro: [(cliente && cliente.bairro) ? cliente.bairro : null],
      localidade: [(cliente && cliente.localidade) ? cliente.localidade : null],
      uf: [(cliente && cliente.uf) ? cliente.uf : null]
    })
  
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const cliente = this.formGroup.value;
      console.log('Dados enviados no formulário:', cliente); // Adicione este log
      const operacao = cliente.id == null
        ? this.clienteService.insert(cliente)
        : this.clienteService.update(cliente);
  
      operacao.subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/clientes');
        },
        error: (err) => {
          console.log('Erro ao Salvar' + JSON.stringify(err));
        }
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const cliente = this.formGroup.value;
      if (cliente.id != null) {
        this.clienteService.delete(cliente).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/clientes');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
