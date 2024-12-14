import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SerieService } from '../../../services/serie.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Serie } from '../../../models/serie.model';

@Component({
  selector: 'app-serie-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './serie-form.component.html',
  styleUrl: './serie-form.component.css'
})
export class SerieFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private serieService: SerieService,
    private router: Router,
  private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        nome:['', Validators.required],
        anoLancamento:['', Validators.required]
      }) 
  }
  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    const serie: Serie = this.activatedRoute.snapshot.data['serie'];
  
    this.formGroup = this.formBuilder.group({
      id: [(serie && serie.id) ? serie.id : null],
      nome: [(serie && serie.nome) ? serie.nome : null],
      anoLancamento: [(serie && serie.anoLancamento) ? serie.anoLancamento : null]
    })
  
  }
  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const serie = this.formGroup.value;
      console.log('Dados enviados no formulário:', serie); // Adicione este log
      const operacao = serie.id == null
        ? this.serieService.create(serie)
        : this.serieService.update(serie);
  
      operacao.subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/series');
        },
        error: (err) => {
          console.log('Erro ao Salvar' + JSON.stringify(err));
        }
      });
    }
  }
}
