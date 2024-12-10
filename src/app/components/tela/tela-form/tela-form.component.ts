import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TelaService } from '../../../services/tela.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { Tela } from '../../../models/tela.model';

@Component({
  selector: 'app-tela-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './tela-form.component.html',
  styleUrl: './tela-form.component.css'
})
export class TelaFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private telaService: TelaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        id: [null],
        tamanho:['', Validators.required],
        resolucao:['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    const tela: Tela = this.activatedRoute.snapshot.data['tela'];
  
    this.formGroup = this.formBuilder.group({
      id: [(tela && tela.id) ? tela.id : null],
      tamanho: [(tela && tela.tamanho) ? tela.tamanho : null],
      resolucao: [(tela && tela.resolucao) ? tela.resolucao : null],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novaTela = this.formGroup.value;
      this.telaService.create(novaTela).subscribe({
        next: (telaCadastrado) => {
          this.router.navigateByUrl('/admin/telas');
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
