import { Component, OnInit } from '@angular/core';
import { TelaService } from '../../../services/tela.service';
import { Tela } from '../../../models/tela.model';
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
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-tela-list',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatCardActions,
    MatLabel, MatFormField, MatCardContent, MatCardTitle, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatPaginatorModule],
  templateUrl: './tela-list.component.html',
  styleUrl: './tela-list.component.css'
})
export class TelaListComponent implements OnInit{

  totalRecords = 0;
  pageSize = 2;
  page = 0;

  displayedColumns : string[] = ['tamanho', 'resolucao', 'acao'];

  telaForm!: FormGroup;
  telaSelecionado: Tela | null = null;

  telas : Tela[] = [];

  constructor(private telaService : TelaService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.telaForm = this.formBuilder.group({
      tamanho : ['', Validators.required],
      resolucao : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.telaService.findAll(this.page, this.pageSize).subscribe(data => {
      this.telas = data;
    });

    this.telaService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  delete(id: number): void {
    this.telaService.delete(id).subscribe(
      () => {
        this.telas = this.telas.filter(tela => tela.id !== id);
        this.snackBar.open('Tela deletado com sucesso', 'Fechar', { duration: 3000 });
        this.ngOnInit();
      },
      (error) => {
        console.error('Erro ao deletar Tela:', error);
        this.snackBar.open('Erro ao deletar tela', 'Fechar', { duration: 3000 });
      }
    );
  }

  editarTela(tela: Tela): void {
    this.telaSelecionado = tela;

    // Preencher o formulário com os dados do tela selecionado
    this.telaForm.patchValue({
      tamanho: tela.tamanho,
      resolucao: tela.resolucao,
    });
  }

  salvarTela(): void {
    if (this.telaForm.valid && this.telaSelecionado) {
      const telaEditado = {
        ...this.telaSelecionado,
        ...this.telaForm.value
      };

      if (telaEditado.id) {
              this.telaService.update(telaEditado).subscribe(() => {
              this.ngOnInit();  // Atualizar a lista após a edição
              this.cancelarEdicao();        // Fechar o card de edição
            });
      }
    }
  }

  cancelarEdicao(): void {
    this.telaSelecionado = null;
    this.telaForm.reset();  // Reseta o formulário
  }

}
