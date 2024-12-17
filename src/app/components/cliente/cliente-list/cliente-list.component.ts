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
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatCardActions,
    MatLabel, MatFormField, MatCardContent, MatCardTitle, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatPaginatorModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit{
  
  totalRecords = 0;
  pageSize = 4;
  page = 0;

  clientes: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cep', 'cpf', 'acao'];

  clienteForm!: FormGroup;
  clienteSelecionado: Cliente | null = null;

    constructor(private clienteService: ClienteService, private snackBar: MatSnackBar, private formBuilder: FormBuilder){
      this.clienteForm = this.formBuilder.group({
        nome:['', Validators.required],
        cep:['', Validators.required],
        cpf:['' , Validators.required],
        login:['', Validators.required],
      });
    }
 
 
  ngOnInit(): void {
    this.clienteService.findAll(this.page, this.pageSize).subscribe(data => {
      this.clientes = data;
    });

    this.clienteService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  delete(id: number): void {
    this.clienteService.delete(id).subscribe(
      () => {
        this.snackBar.open('cliente deletada com sucesso', 'Fechar', { duration: 3000 });
        this.ngOnInit();
      },
      (error) => {
        console.error('Erro ao deletar cliente:', error);
        this.snackBar.open('Erro ao deletar cliente', 'Fechar', { duration: 3000 });
      }
    );
  }

}
