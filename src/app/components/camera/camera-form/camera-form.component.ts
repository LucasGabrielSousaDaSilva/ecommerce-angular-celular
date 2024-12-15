import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CameraService } from '../../../services/camera.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { Camera } from '../../../models/camera.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfimationDialogComponent } from '../../../dialog/confimation-dialog/confimation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-camera-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, ReactiveFormsModule, MatCardModule, RouterModule],
  templateUrl: './camera-form.component.html',
  styleUrl: './camera-form.component.css'
})
export class CameraFormComponent  implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private cameraService: CameraService,
    private dialog: MatDialog,    
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        id: [null],
        resolucao:['', Validators.required],
        frontal:['', Validators.required]
      }) 
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    const camera: Camera = this.activatedRoute.snapshot.data['camera'];
  
    this.formGroup = this.formBuilder.group({
      id: [(camera && camera.id) ? camera.id : null],
      resolucao: [(camera && camera.resolucao) ? camera.resolucao : null],
      frontal: [(camera && camera.frontal) ? camera.frontal : null],
    })
  
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const camera = this.formGroup.value;
      console.log('Dados enviados no formulário:', camera); // Adicione este log
      
      const operacao = camera.id == null
        ? this.cameraService.create(camera)
        : this.cameraService.update(camera);
  
      operacao.subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/cameras');
          this.snackBar.open('A Camera foi salva com Sucesso!!', 'Fechar', {duration: 3000});
        },
        error: (err) => {
          console.log('Erro ao Salvar' + JSON.stringify(err));
          this.snackBar.open('Erro ao tentar salvar a Camera', 'Fechar', {duration: 3000});
        }
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const camera = this.formGroup.value;
      if (camera.id != null) {
        const dialogRef = this.dialog.open(ConfimationDialogComponent, {
          data: { message: 'Deseja realmente excluir esta editora? Não será possível reverter.' }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.cameraService.delete(camera).subscribe({
              next: () => {
                this.router.navigateByUrl('/admin/editoras');
                this.snackBar.open('A Editora foi excluída com Sucesso!!', 'Fechar', {duration: 3000});
              },
              error: (err) => {
                console.log('Erro ao excluir' + JSON.stringify(err));
                this.snackBar.open('Erro ao tentar excluir a Editora', 'Fechar', {duration: 3000});
              }
            });
          }
        });
      }
    }
  }
}