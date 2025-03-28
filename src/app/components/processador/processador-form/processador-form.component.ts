import { Component, model, OnInit } from '@angular/core';
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
import { Processador } from '../../../models/processador.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-processador-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './processador-form.component.html',
  styleUrl: './processador-form.component.css'
})
export class ProcessadorFormComponent implements OnInit {
  formGroup!: FormGroup;

constructor(
  private formBuilder: FormBuilder,
  private processadorService: ProcessadorService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private snackBar: MatSnackBar
) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      marca:['', Validators.required],
      modelo:['', Validators.required]
    }) 
}

ngOnInit(): void {
  this.initializeForm();
}

initializeForm(): void {
  const processador: Processador = this.activatedRoute.snapshot.data['processador'];

  this.formGroup = this.formBuilder.group({
    id: [(processador && processador.id) ? processador.id : null],
    marca: [(processador && processador.marca) ? processador.marca : null],
    modelo: [(processador && processador.modelo) ? processador.modelo : null]
  })

}

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const processador = this.formGroup.value;
      console.log('Dados enviados no formulário:', processador); // Adicione este log
      const operacao = processador.id == null
        ? this.processadorService.insert(processador)
        : this.processadorService.update(processador);
  
      operacao.subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/processadores');
          this.snackBar.open('O Porcessador foi salva com Sucesso!!', 'Fechar', {duration: 3000});
        },
        error: (err) => {
          console.log('Erro ao Salvar' + JSON.stringify(err));
          this.snackBar.open('Erro ao tentar salvar o Processador', 'Fechar', {duration: 3000});
        }
      });
    }
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const processador = this.formGroup.value;
      if (processador.id == null) {
        this.processadorService.insert(processador).subscribe({
          next: (processadorCadastrado) => {
            this.router.navigateByUrl('/admin/processadores');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
          this.processadorService.update(processador).subscribe({
            next: (processadorAlterado) => {
              this.router.navigateByUrl('/admin/processadores');
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
                  this.router.navigateByUrl('/admin/processadores');
              },
              error: (err) => {
                  console.log('Erro ao excluir: ' + JSON.stringify(err));
              }
          });
      }
  }
}
