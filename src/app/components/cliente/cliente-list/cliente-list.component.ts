import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../../models/cliente.model";
import { ClienteService } from '../../../services/cliente.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatCardContent } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatCardActions,
    MatLabel, MatFormField, MatCardContent, MatCardTitle, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit{
  
  clientes: Cliente[] = [];
  displayerColemns: string[] = ['id', 'nome', 'cpf', 'cep', 'acao'];

  clienteForm!: FormGroup;
  clienteSelecionado: Cliente | null = null;

    constructor(private clienteService: ClienteService){}
 
 
  ngOnInit(): void {
    this.clienteService.findAll().subscribe(data => {
      this.clientes = data;
    });
  }

  editarCliente(cliente: Cliente): void {
    this.clienteSelecionado = cliente;

    // Preencher o formulário com os dados do funcionário selecionado
    this.clienteForm.patchValue({
      nome: cliente.nome,
      cep: cliente.cep,
      cpf: cliente.cpf,
    });
  }

  salvarcliente(): void {
    if (this.clienteForm.valid && this.clienteSelecionado) {
      const clienteEditado = {
        ...this.clienteSelecionado,
        ...this.clienteForm.value
      };

      // Aqui, envie os dados editados para o serviço
      this.clienteService.update(clienteEditado).subscribe(() => {
        this.ngOnInit();  // Atualizar a lista após a edição
        this.cancelarEdicao();        // Fechar o card de edição
      });
    }
  }

  cancelarEdicao(): void {
    this.clienteSelecionado = null;
    this.clienteForm.reset();  // Reseta o formulário
  }

}
