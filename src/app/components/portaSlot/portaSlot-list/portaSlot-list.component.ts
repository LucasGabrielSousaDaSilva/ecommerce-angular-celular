import { Component, OnInit } from '@angular/core';
import { PortaSlot } from '../../../models/porta-slot.model';
import { PortaSlotService } from '../../../services/porta-slot.service';
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
  selector: 'app-portaSlot-list',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatCardActions,
    MatLabel, MatFormField, MatCardContent, MatCardTitle, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatDivider, MatPaginatorModule],
  templateUrl: './portaSlot-list.component.html',
  styleUrl: './portaSlot-list.component.css'
})
export class PortaSlotListComponent {

  totalRecords = 0;
  pageSize = 4;
  page = 0;

  portaSlots: PortaSlot[] = [];
  displayedColumns: string[] = ['tipo', 'acao'];
  portaSlotForm!: FormGroup;
  portaSlotSelecionado: PortaSlot | null = null;

  constructor(private portaSlotService: PortaSlotService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.portaSlotForm = this.formBuilder.group({
      tipo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.portaSlotService.findAll(this.page, this.pageSize).subscribe(data => {
      this.portaSlots = data;
    });

    this.portaSlotService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  delete(id: number): void {
    this.portaSlotService.delete(id).subscribe(
      () => {
        this.snackBar.open('PortaSlot deletada com sucesso', 'Fechar', { duration: 3000 });
        this.ngOnInit();
      },
      (error) => {
        console.error('Erro ao deletar portaSlot:', error);
        this.snackBar.open('Erro ao deletar portaSlot', 'Fechar', { duration: 3000 });
      }
    );
  }

  editarPortaSlot(portaSlot: PortaSlot): void {
    this.portaSlotSelecionado = portaSlot;

    this.portaSlotForm.patchValue({
      tipo : portaSlot.tipo,
    });
  }

  salvarPortaSlot(): void {
    if (this.portaSlotForm.valid && this.portaSlotSelecionado) {
      const portaSlotEditado = {
        ...this.portaSlotSelecionado,
        ...this.portaSlotForm.value
      };

      this.portaSlotService.update(portaSlotEditado).subscribe(() => {
        this.ngOnInit(); 
        this.cancelarEdicao();      
      });
    }
  }

  cancelarEdicao(): void {
    this.portaSlotSelecionado = null;
    this.portaSlotForm.reset(); 
  }



}