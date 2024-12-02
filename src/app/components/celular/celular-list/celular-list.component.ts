import { Component, OnInit } from '@angular/core';
import { Celular } from '../../../models/celular.model';
import { CelularService } from '../../../services/celular.service';
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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-celular-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatCardActions,
    MatLabel, MatFormField, MatCardContent, MatCardTitle, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatDivider, MatPaginatorModule
  ],
  templateUrl: './celular-list.component.html',
  styleUrl: './celular-list.component.css'
})
export class CelularListComponent {

  totalRecords = 0;
  pageSize = 4;
  page = 0;

  celulars: Celular[] = [];
  displayedColumns: string[] = ['nome', 'preco', 'estoque'];
  celularForm!: FormGroup;
  celularSelecionado: Celular | null = null;

  constructor(private celularService: CelularService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.celularForm = this.formBuilder.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      estoque: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.celularService.findAll(this.page, this.pageSize).subscribe(data => {
      this.celulars = data;
    });

    this.celularService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  delete(id: number): void {
    this.celularService.delete(id).subscribe(
      () => {
        this.snackBar.open('Celular deletado com sucesso', 'Fechar', { duration: 3000 });
        this.ngOnInit();
      },
      (error) => {
        console.error('Erro ao deletar celular:', error);
        this.snackBar.open('Erro ao deletar celular', 'Fechar', { duration: 3000 });
      }
    );
  }

  editarCelular(celular: Celular): void {
    this.celularSelecionado = celular;

    this.celularForm.patchValue({
      nome: celular.nome,
      preco: celular.preco,
      estoque: celular.estoque
    });
  }

  salvarCelular(): void {
    if (this.celularForm.valid && this.celularSelecionado) {
      const celularEditado = {
        ...this.celularSelecionado,
        ...this.celularForm.value
      };

      this.celularService.update(celularEditado).subscribe(() => {
        this.ngOnInit(); 
        this.cancelarEdicao();      
      });
    }
  }

  cancelarEdicao(): void {
    this.celularSelecionado = null;
    this.celularForm.reset(); 
  }


}
