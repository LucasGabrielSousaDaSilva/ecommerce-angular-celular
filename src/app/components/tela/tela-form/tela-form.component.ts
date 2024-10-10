import { Component } from '@angular/core';
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

@Component({
  selector: 'app-tela-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './tela-form.component.html',
  styleUrl: './tela-form.component.css'
})
export class TelaFormComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private telaService: TelaService,
    private router: Router) {
      this.formGroup = this.formBuilder.group({
        tamanho:['', Validators.required],
        resolucao:['', Validators.required]
      }) 
  }
  onSubmit() {
    if (this.formGroup.valid) {
      const novaTela = this.formGroup.value;
      this.telaService.insert(novaTela).subscribe({
        next: (telaCadastrado) => {
          this.router.navigateByUrl('/telas');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const tela = this.formGroup.value;
      if (tela.id ==null) {
        this.telaService.insert(tela).subscribe({
          next: (telaCadastrado) => {
            this.router.navigateByUrl('/telas');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
    this.telaService.update(tela).subscribe({
          next: (telaAlterado) => {
            this.router.navigateByUrl('/telas');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    } else {
      console.log("Formulário inválido.")
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const tela = this.formGroup.value;
      if (tela.id != null) {
      this.telaService.delete(tela).subscribe({
          next: () => {
            this.router.navigateByUrl('/telas');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}
