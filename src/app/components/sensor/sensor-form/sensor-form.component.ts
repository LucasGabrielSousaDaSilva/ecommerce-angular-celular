import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SensorService } from '../../../services/sensor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Sensor } from '../../../models/sensor.model';

@Component({
  selector: 'app-sensor-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './sensor-form.component.html',
  styleUrl: './sensor-form.component.css'
})
export class SensorFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private sensorService: SensorService,
    private router: Router,
  private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        tipo:['', Validators.required],
      }) 
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    const sensor: Sensor = this.activatedRoute.snapshot.data['sensor'];
  
    this.formGroup = this.formBuilder.group({
      id: [(sensor && sensor.id) ? sensor.id : null],
      tipo: [(sensor && sensor.tipo) ? sensor.tipo : null],
    })
  
  }
  onSubmit() {
    if (this.formGroup.valid) {
      const novosensor = this.formGroup.value;
      this.sensorService.create(novosensor).subscribe({
        next: (sensorCadastrado) => {
          this.router.navigateByUrl('/admin/sensores');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}
