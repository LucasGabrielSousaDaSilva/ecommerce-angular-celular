import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LinhaService } from '../../../services/linha.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Linha } from '../../../models/linha.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ConfimationDialogComponent } from '../../../dialog/confimation-dialog/confimation-dialog.component';

@Component({
  selector: 'app-linha-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatPaginatorModule],
  templateUrl: './linha-list.component.html',
  styleUrl: './linha-list.component.css'
})
export class LinhaListComponent implements OnInit {
  totalRecords = 0;
  pageSize = 4;
  page = 0;

  displayedColumns : string[] = ['nome','anoLancamento','acao'];

  linhaForm!: FormGroup;
  linhaSelecionado: Linha | null = null;

  linhas : Linha[] = [];

  constructor(
    private linhaService : LinhaService, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.linhaService.findAll(this.page, this.pageSize).subscribe(
      data => {this.linhas = data;
    });

    this.linhaService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  obterNumeroLinha(index: number): number {
    return this.page * this.pageSize + index + 1;
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  delete(linha: Linha): void {
    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      width: '250px',
      data: {message: 'Deseja realmente excluir esta linha?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.linhaService.delete(linha.id).subscribe({
        next: () => {
          this.linhas = this.linhas.filter(e => e.id !== linha.id);
          this.snackBar.open('Linha deletado com sucesso', 'Fechar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Erro ao deletar Linha:', err);
          this.snackBar.open('Erro ao deletar linha', 'Fechar', { duration: 3000 });
        }
      });
      }
    });
  }
}
