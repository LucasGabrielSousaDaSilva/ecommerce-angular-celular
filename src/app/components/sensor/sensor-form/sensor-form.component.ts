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
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimationDialogComponent } from '../../../dialog/confimation-dialog/confimation-dialog.component';

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
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
      this.formGroup = this.formBuilder.group({
        id:[null],
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
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const sensor = this.formGroup.value;
      console.log('Dados enviados no formulário:', sensor); // Adicione este log
      const operacao = sensor.id == null
        ? this.sensorService.create(sensor)
        : this.sensorService.update(sensor);
  
      operacao.subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/sensores');
          this.snackBar.open('O Sensor foi salva com Sucesso!!', 'Fechar', {duration: 3000});
        },
        error: (err) => {
          console.log('Erro ao Salvar' + JSON.stringify(err));
          this.snackBar.open('Erro ao tentar salvar o Sensor', 'Fechar', {duration: 3000});
        }
      });
    }
  }
  excluir() {
    if (this.formGroup.valid) {
      const sensor = this.formGroup.value;
      if (sensor.id != null) {
        const dialogRef = this.dialog.open(ConfimationDialogComponent, {
          data: { message: 'Deseja realmente excluir esta sensor? Não será possível reverter.' }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.sensorService.delete(sensor).subscribe({
              next: () => {
                this.router.navigateByUrl('/admin/sensores');
                this.snackBar.open('A Sensor foi excluída com Sucesso!!', 'Fechar', {duration: 3000});
              },
              error: (err) => {
                console.log('Erro ao excluir' + JSON.stringify(err));
                this.snackBar.open('Erro ao tentar excluir a Sensor', 'Fechar', {duration: 3000});
              }
            });
          }
        });
      }
    }
  }
}
