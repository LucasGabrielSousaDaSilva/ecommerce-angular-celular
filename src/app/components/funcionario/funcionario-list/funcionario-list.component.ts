import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../models/funcionario.model';
import { FuncionarioService } from '../../../services/funcionario.service';
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
import { MatDivider } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatCardActions,
    MatLabel, MatFormField, MatCardContent, MatCardTitle, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatDivider, MatPaginatorModule
  ],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.css'
})
export class FuncionarioListComponent implements OnInit{

  totalRecords = 0;
  pageSize = 2;
  page = 0;

  funcionarios: Funcionario[] = [];
  displayedColumns: string[] = ['nome', 'cep', 'cpf', 'cnpj', 'acao'];
  funcionarioForm!: FormGroup;
  funcionarioSelecionado: Funcionario | null = null;

  constructor(private funcionarioService: FuncionarioService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.funcionarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cep: ['', Validators.required],
      cpf: ['', Validators.required],
      cnpj: ['', Validators.required],
      login: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.funcionarioService.findAll(this.page, this.pageSize).subscribe(data => {
      this.funcionarios = data;
    });

    this.funcionarioService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  delete(id: number): void {
    this.funcionarioService.delete(id).subscribe(
      () => {
        this.snackBar.open('Funcionário deletado com sucesso', 'Fechar', { duration: 3000 });
        this.ngOnInit();
      },
      (error) => {
        console.error('Erro ao deletar funcionário:', error);
        this.snackBar.open('Erro ao deletar funcionário', 'Fechar', { duration: 3000 });
      }
    );
  }

  editarFuncionario(funcionario: Funcionario): void {
    this.funcionarioSelecionado = funcionario;

    this.funcionarioForm.patchValue({
      nome: funcionario.nome,
      cep: funcionario.cep,
      cpf: funcionario.cpf,
      cnpj: funcionario.cnpj,
      login: funcionario.login
    });
  }

  salvarFuncionario(): void {
    if (this.funcionarioForm.valid && this.funcionarioSelecionado) {
      const funcionarioEditado = {
        ...this.funcionarioSelecionado,
        ...this.funcionarioForm.value
      };

      this.funcionarioService.update(funcionarioEditado).subscribe(() => {
        this.ngOnInit(); 
        this.cancelarEdicao();      
      });
    }
  }

  cancelarEdicao(): void {
    this.funcionarioSelecionado = null;
    this.funcionarioForm.reset(); 
  }



}
