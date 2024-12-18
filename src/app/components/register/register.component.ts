import { CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { CepService } from '../../services/CepService';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatCardModule, MatToolbarModule, RouterModule, MatSelectModule, MatIcon, MatStepperModule, CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private cepService: CepService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      id:['', Validators.required],
      nome:['', Validators.required],
      cep:['', Validators.required],
      cpf:['' , Validators.required],
      login:['', Validators.required],
      senha:['', Validators.required]
    });

    //   id: ['', Validators.required],
    //   firstFormGroup: this.formBuilder.group({
    //     nome: ['', Validators.required],
    //     cpf: ['', [Validators.required]], //Validators.pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}/)]
    //   }),
    //   secondFormGroup: this.formBuilder.group({
    //     cep: ['', Validators.required],
    //   }),
    //   thirdFormGroup: this.formBuilder.group({
    //     login: ['', Validators.required],
    //     senha: ['', [Validators.required, Validators.minLength(6)]],
    //   }),
    // });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  // preencherDadosCliente(): Cliente {
  //   let cliente: Cliente = {} as Cliente;
  //   cliente.id = this.formGroup.get('id')?.value;
  //   cliente.nome = this.formGroup.get('firstFormGroup')?.get('nome')?.value;
  //   cliente.cpf = this.formGroup.get('firstFormGroup')?.get('cpf')?.value;

  //   cliente.cep = this.formGroup.get('secondFormGroup')?.get('cep')?.value;
    
  //   cliente.login = this.formGroup.get('thirdFormGroup')?.get('login')?.value;
  //   cliente.senha = this.formGroup.get('thirdFormGroup')?.get('senha')?.value;

  //   return cliente;
  // }

  initializeForm(): void {
    const cliente: Cliente = this.activatedRoute.snapshot.data['cliente'];

    // if (cliente) {
    //   this.formGroup.patchValue({
    //     id: cliente.id,
    //     firstFormGroup: {
    //       nome: cliente.nome || '',
    //       cpf: cliente.cpf || '',
    //     },
    //     secondFormGroup: {
    //       cep: cliente.cep || '',

    //     },
    //     thirdFormGroup: {
    //       login: cliente.login || '',
    //       senha: cliente.senha || '',
    //     }
    //   });
    // }

      this.formGroup = this.formBuilder.group({
        id: [(cliente && cliente.id) ? cliente.id : null],
        nome: [(cliente && cliente.nome) ? cliente.nome : null],
        cep: [(cliente && cliente.cep) ? cliente.cep : null],
        cpf: [(cliente && cliente.cpf) ? cliente.cpf : null],
          login: [(cliente && cliente.login) ? cliente.login : null],
          senha: [(cliente && cliente.senha) ? cliente.senha : null],

      })
  }

  // formatCpf() {
  //   const cpfControl = this.formGroup.get('firstFormGroup')?.get('cpf');
  //   if (cpfControl && cpfControl.value) {
  //     const formattedCpf = cpfControl.value.replace(/\D/g, '') // Remove não dígitos
  //       .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  //     cpfControl.setValue(formattedCpf);
  //   }
  // }

  cancelar() {
    this.router.navigateByUrl('/login');
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const cliente = this.formGroup.value;
      console.log("cadastro cliente: " + cliente)
      this.clienteService.insert(cliente).subscribe({
        next: () => {
          this.router.navigateByUrl('/user/ecommerce')
        },
        error: (error) => {
          console.log('Erro ao Salvar: ' + JSON.stringify(error));
          this.tratarErros(error);
        }
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const cliente = this.formGroup.value;
      if (cliente.id != null) {
        this.clienteService.delete(cliente).subscribe({
          next: () => {
            this.router.navigateByUrl('/ecommerce');
          },
          error: (err) => {
            console.log('Erro ao Excluir: ' + JSON.stringify(err));
          }
        });
      }
    }
  }

  getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return ''; // Nenhum erro encontrado
    }

    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName]?.[errorName]) {
        return this.errorMessages[controlName][errorName];
      }
    }

    return 'Campo inválido'; // Retorno padrão para erros não tratados
  }

  tratarErros(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 400) {
      if (errorResponse.error?.errors) {
        errorResponse.error.errors.forEach((validationError: any) => {
          const formControl = this.formGroup.get(validationError.fieldName);
          if (formControl) {
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      }
    } else if (errorResponse.status < 400) {
      alert(errorResponse.error?.message || 'Erro genérico do envio do formulário.');
    } else if (errorResponse.status >= 500) {
      alert('Erro interno do servidor.');
    }
  }

  // preencherEnderecoPeloCep() {
  //   let cep: string = this.formGroup.get('secondFormGroup')?.get('enderecoCep')?.value;

  //   this.cepService.getEnderecoByCep(cep).subscribe({
  //     next: (enderecoViaCep) => {
  //       this.formGroup.get('secondFormGroup')?.get('enderecoLogradouro')?.setValue(enderecoViaCep.logradouro);
  //       this.formGroup.get('secondFormGroup')?.get('enderecoBairro')?.setValue(enderecoViaCep.bairro);
  //       this.formGroup.get('secondFormGroup')?.get('enderecoCidade')?.setValue(enderecoViaCep.localidade);
  //       this.formGroup.get('secondFormGroup')?.get('enderecoEstado')?.setValue(enderecoViaCep.uf);
  //     },
  //     error: (err) => {
  //       console.log('Erro ao preencher cep: ' + JSON.stringify(err));
  //     }
  //   });
  // }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    nome: {
      required: 'O nome é obrigatório.',
      apiError: '',
    },
    cpf: {
      required: 'O CPF é obrigatório.',
      // pattern: 'CPF deve seguir o formato 000.000.000-00',
      apiError: '',
    },
    email: {
      required: 'O e-mail é obrigatório.',
      email: 'O e-mail deve estar em um formato válido.',
      apiError: '',
    },
    login: {
      required: 'O login é obrigatório.',
      apiError: '',
    },
    senha: {
      required: 'A senha é obrigatória.',
      minlength: 'A senha deve ter pelo menos 6 caracteres.',
      apiError: '',
    },
    logradouro: {
      required: 'O logradouro é obrigatório.',
      apiError: '',
    },
    complemento: {
      required: 'O complemento é obrigatório.',
      apiError: '',
    },
    bairro: {
      required: 'O bairro é obrigatório.',
      apiError: '',
    },
    localidade: {
      required: 'A cidade é obrigatória.',
      apiError: '',
    },
    uf: {
      required: 'O estado é obrigatório.',
      apiError: '',
    },
  };
}
