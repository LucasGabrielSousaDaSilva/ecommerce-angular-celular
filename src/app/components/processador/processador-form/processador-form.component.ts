import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProcessadorService } from '../../../services/processador.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-processador-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './processador-form.component.html',
  styleUrl: './processador-form.component.css'
})
export class ProcessadorFormComponent {
  formGroup!: FormGroup;

constructor(
  private formBuilder: FormBuilder,
  private processadorService: ProcessadorService,
  private router: Router
) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      marca:['', Validators.required],
      modelo:['', Validators.required]
    }) 
}

  onSubmit() {
    if (this.formGroup.valid) {
      const novoProcessador = this.formGroup.value;
      this.processadorService.insert(novoProcessador).subscribe({
        next: (processadorCadastrado) => {
          this.router.navigateByUrl('/processadores');
        },
        error: (err) => {
          console.log('Erro ao salvar: ' + JSON.stringify(err));
        }
      })
    }
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const processador = this.formGroup.value;
      if (processador.id == null) {
        this.processadorService.insert(processador).subscribe({
          next: (processadorCadastrado) => {
            this.router.navigateByUrl('/processadores');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
          this.processadorService.update(processador).subscribe({
            next: (processadorAlterado) => {
              this.router.navigateByUrl('/processadores');
            },
            error: (err) => {
              console.log('Erro ao Editar' + JSON.stringify(err));
            }
        });
      }
    } else {
      console.log("Formulário inválido.")
      this.onSubmit();
    }
  }

  confirmarExclusao() {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este item?');
    if (confirmacao) {
        this.excluir();
    }
}

  excluir() {
      const id = this.formGroup.get('id')?.value;
      if (id) {
          this.processadorService.delete(id).subscribe({
              next: () => {
                  this.router.navigateByUrl('/processadores');
              },
              error: (err) => {
                  console.log('Erro ao excluir: ' + JSON.stringify(err));
              }
          });
      }
  }
}
