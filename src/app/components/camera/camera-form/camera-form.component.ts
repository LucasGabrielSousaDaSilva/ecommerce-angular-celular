import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CameraService } from '../../../services/camera.service';
import { Router, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-camera-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, ReactiveFormsModule, MatCardModule, RouterModule],
  templateUrl: './camera-form.component.html',
  styleUrl: './camera-form.component.css'
})
export class CameraFormComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private cameraService: CameraService,
    private router: Router) {
      this.formGroup = this.formBuilder.group({
        resolucao:['', Validators.required],
        frontal:['', Validators.required]
      }) 
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoCamera = this.formGroup.value;
      this.cameraService.create(novoCamera).subscribe({
        next: (cameraCadastrado) => {
          this.router.navigateByUrl('/cameras');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }
}