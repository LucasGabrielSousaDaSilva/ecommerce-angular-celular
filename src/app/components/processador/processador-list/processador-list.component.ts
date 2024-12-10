import { Component, OnInit } from '@angular/core';
import { ProcessadorService } from '../../../services/processador.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Processador } from '../../../models/processador.model';
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
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDivider } from '@angular/material/divider';


@Component({
  selector: 'app-processador-list',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatCardActions,
    MatLabel, MatFormField, MatCardContent, MatCardTitle, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatPaginatorModule, MatDivider],
  templateUrl: './processador-list.component.html',
  styleUrl: './processador-list.component.css'
})
export class ProcessadorListComponent implements OnInit{

  totalRecords = 0;
  pageSize = 3;
  page = 0;

  displayedColumns : string[] = ['marca', 'modelo', 'acao'];
  processadorForm!: FormGroup;
  processadorSelecionado: Processador | null = null;
  processadores : Processador [] = [];

  constructor(private processadorService : ProcessadorService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.processadorForm = this.formBuilder.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.processadorService.findAll(this.page, this.pageSize).subscribe(data => {
      this.processadores = data;
    });

    this.processadorService.count().subscribe(
      data => {
        this.totalRecords = data;
      },
      error => {
        console.error('Erro ao obter a contagem de registros:', error);
        // Adicione aqui qualquer lógica adicional de tratamento de erro, se necessário
      }
    );
}

paginar(event: PageEvent): void {
  this.page = event.pageIndex;
  this.pageSize = event.pageSize;
  this.ngOnInit();
}

delete(id: number): void {
  this.processadorService.delete(id).subscribe(
    () => {
      this.snackBar.open('Tela deletado com sucesso', 'Fechar', { duration: 3000 });
      this.ngOnInit();
    },
    (error) => {
      console.error('Erro ao deletar Processador:', error);
      this.snackBar.open('Erro ao deletar processador', 'Fechar', { duration: 3000 });
    }
  );
}

editarProcessador(processador : Processador): void {
  this.processadorSelecionado = processador;

  // Preencher o formulário com os dados do processador selecionado
  this.processadorForm.patchValue({
    marca : processador.marca,
    modelo : processador.modelo,
  });
}

salvarProcessador(): void {
  if (this.processadorForm.valid && this.processadorSelecionado) {
    const processadorEditado = {
      ...this.processadorSelecionado,
      ...this.processadorForm.value
    };

  if (processadorEditado.id) {
    this.processadorService.update(processadorEditado).subscribe(() => {
      this.ngOnInit();  // Atualiza a lista após a edição
      this.cancelarEdicao();  // Fecha o card de edição
    });
  } else {
    console.error('ID do processador não encontrado!');
    }
  }
}

cancelarEdicao(): void {
  this.processadorSelecionado = null;
  this.processadorForm.reset();  // Reseta o formulário
}

}
