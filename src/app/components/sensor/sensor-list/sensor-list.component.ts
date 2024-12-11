import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Sensor } from '../../../models/sensor.model';
import { SensorService } from '../../../services/sensor.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sensor-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, CommonModule, MatCardModule, ReactiveFormsModule,
    MatInputModule, MatPaginatorModule],
  templateUrl: './sensor-list.component.html',
  styleUrl: './sensor-list.component.css'
})
export class SensorListComponent implements OnInit {
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  displayedColumns : string[] = ['tipo','acao'];

  telaForm!: FormGroup;
  sensorSelecionado: Sensor | null = null;

  sensores : Sensor[] = [];

  constructor(private sensorService : SensorService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.sensorService.findAll(this.page, this.pageSize).subscribe(data => {
      this.sensores = data;
    });

    this.sensorService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  delete(id: number): void {
    this.sensorService.delete(id).subscribe(
      () => {
        this.sensores = this.sensores.filter(sensor => sensor.id !== id);
        this.snackBar.open('Sensor deletado com sucesso', 'Fechar', { duration: 3000 });
        this.ngOnInit();
      },
      (error) => {
        console.error('Erro ao deletar Sensor:', error);
        this.snackBar.open('Erro ao deletar sensor', 'Fechar', { duration: 3000 });
      }
    );
  }
}
