import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CelularService } from '../../../services/celular.service';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Celular } from '../../../models/celular.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-celular-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule, MatIconModule],
  templateUrl: './celular-form.component.html',
  styleUrl: './celular-form.component.css'
})
export class CelularFormComponent implements OnInit {
  formGroup!: FormGroup;

  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
    private celularService: CelularService,
    private router: Router,
  private activatedRoute: ActivatedRoute,
  private location: Location) {
      this.formGroup = this.formBuilder.group({
        id: [null],
        nome:['', Validators.required],
        preco:['', Validators.required],
        estoque:['', Validators.required]
      }) 
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  voltarPagina() {
    this.location.back();
  }

  initializeForm(): void {
    const celular: Celular = this.activatedRoute.snapshot.data['celular'];

    // carregando a imagem do preview
    if (celular && celular.nomeImagem) {
      this.imagePreview = this.celularService.getUrlImage(celular.nomeImagem);
      this.fileName = celular.nomeImagem;
    }

    this.formGroup = this.formBuilder.group({
      id: [(celular && celular.id) ? celular.id : null],
      nome: [(celular && celular.nome) ? celular.nome : null],
      preco: [(celular && celular.preco) ? celular.preco : null],
      estoque: [(celular && celular.estoque) ? celular.estoque : null]
    });
  }

  tratarErros(errorResponse: HttpErrorResponse) {

    if (errorResponse.status === 400) {
      if (errorResponse.error?.errors) {
        errorResponse.error.errors.forEach((validationError: any) => {
          const formControl = this.formGroup.get(validationError.fieldName);

          if (formControl) {
            formControl.setErrors({apiError: validationError.message})
          }

        });
      }
    } else if (errorResponse.status < 400){
      alert(errorResponse.error?.message || 'Erro genérico do envio do formulário.');
    } else if (errorResponse.status >= 500) {
      alert('Erro interno do servidor.');
    }

  }

  carregarImagemSelecionada(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      // carregando image preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

  }

  private uploadImage(celularId: number) {
    if (this.selectedFile) {
      this.celularService.uploadImage(celularId, this.selectedFile.name, this.selectedFile)
      .subscribe({
        next: () => {
          this.voltarPagina();
        },
        error: err => {
          console.log('Erro ao fazer o upload da imagem');
          // tratar o erro
        }
      })
    } else {
      this.voltarPagina();
    }
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const celular = this.formGroup.value;

      // selecionando a operacao (insert ou update)
      const operacao = celular.id == null
      ? this.celularService.insert(celular)
      : this.celularService.update(celular);

      // executando a operacao
      operacao.subscribe({
        next: (celularCadastrada) => {
          this.uploadImage(celularCadastrada.id);
        },
        error: (error) => {
          console.log('Erro ao Salvar' + JSON.stringify(error));
          this.tratarErros(error);
        }
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const celular = this.formGroup.value;
      if (celular.id != null) {
        this.celularService.delete(celular).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/celulares');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }
    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
        return this.errorMessages[controlName][errorName];
      }
    }

    return 'invalid field';
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    nome: {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 2 letras.',
      maxlength: 'O nome deve conter no máximo 10 letras.',
      apiError: ' '
    },
    preco: {
      required: 'O preço deve ser informado.',
      apiError: ' '
    },
    estoque: {
      required: 'O estoque deve ser informado.',
      apiError: ' '
    }
  }

}
