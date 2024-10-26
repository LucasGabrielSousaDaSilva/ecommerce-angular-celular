import { Component, OnInit } from '@angular/core';
import { Camera } from '../../../models/camera.model';
import { CameraService } from '../../../services/camera.service';
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
  selector: 'app-camera-list',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatCardActions,
    MatLabel, MatFormField, MatCardContent, MatCardTitle, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatDivider, MatPaginatorModule],
  templateUrl: './camera-list.component.html',
  styleUrl: './camera-list.component.css'
})
export class CameraListComponent {

  totalRecords = 0;
  pageSize = 2;
  page = 0;

  cameras: Camera[] = [];
  displayedColumns: string[] = ['resolucao', 'frontal', 'acao'];
  cameraForm!: FormGroup;
  cameraSelecionado: Camera | null = null;

  constructor(private cameraService: CameraService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.cameraForm = this.formBuilder.group({
      resolucao: ['', Validators.required],
      frontal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cameraService.findAll(this.page, this.pageSize).subscribe(data => {
      this.cameras = data;
    });

    this.cameraService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  delete(id: number): void {
    this.cameraService.delete(id).subscribe(
      () => {
        this.snackBar.open('Camera deletada com sucesso', 'Fechar', { duration: 3000 });
        this.ngOnInit();
      },
      (error) => {
        console.error('Erro ao deletar camera:', error);
        this.snackBar.open('Erro ao deletar camera', 'Fechar', { duration: 3000 });
      }
    );
  }

  editarCamera(camera: Camera): void {
    this.cameraSelecionado = camera;

    this.cameraForm.patchValue({
      resolucao : camera.resolucao,
      frontal : camera.frontal
    });
  }

  salvarCamera(): void {
    if (this.cameraForm.valid && this.cameraSelecionado) {
      const cameraEditado = {
        ...this.cameraSelecionado,
        ...this.cameraForm.value
      };

      this.cameraService.update(cameraEditado).subscribe(() => {
        this.ngOnInit(); 
        this.cancelarEdicao();      
      });
    }
  }

  cancelarEdicao(): void {
    this.cameraSelecionado = null;
    this.cameraForm.reset(); 
  }



}
