import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Linha } from '../../../models/linha.model';
import { LinhaService } from '../../../services/linha.service';

@Component({
  selector: 'app-linha-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './linha-form.component.html',
  styleUrl: './linha-form.component.css'
})
export class LinhaFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private linhaService: LinhaService,
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
    const linha: Linha = this.activatedRoute.snapshot.data['linha'];
  
    this.formGroup = this.formBuilder.group({
      id: [(linha && linha.id) ? linha.id : null],
      nome: [(linha && linha.nome) ? linha.nome : null],
      anoLancamento: [(linha && linha.anoLancamento) ? linha.anoLancamento : null]
    })
  
  }
  onSubmit() {
    if (this.formGroup.valid) {
      const novalinha = this.formGroup.value;
      this.linhaService.create(novalinha).subscribe({
        next: (linhaCadastrado) => {
          this.router.navigateByUrl('/admin/linhas');
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
