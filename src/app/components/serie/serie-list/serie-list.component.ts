import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SerieService } from '../../../services/serie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Serie } from '../../../models/serie.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-serie-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatPaginatorModule],
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent implements OnInit {
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  displayedColumns : string[] = ['nome','anoLancamento','acao'];

  serieForm!: FormGroup;
  serieSelecionado: Serie | null = null;

  series : Serie[] = [];

  constructor(private serieService : SerieService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.serieService.findAll(this.page, this.pageSize).subscribe(data => {
      this.series = data;
    });

    this.serieService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  delete(id: number): void {
    this.serieService.delete(id).subscribe(
      () => {
        this.series = this.series.filter(serie => serie.id !== id);
        this.snackBar.open('Serie deletado com sucesso', 'Fechar', { duration: 3000 });
        this.ngOnInit();
      },
      (error) => {
        console.error('Erro ao deletar Serie:', error);
        this.snackBar.open('Erro ao deletar serie', 'Fechar', { duration: 3000 });
      }
    );
  }
}
