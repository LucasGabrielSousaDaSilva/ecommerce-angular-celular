import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Router, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, ReactiveFormsModule, MatCardModule, RouterModule],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.css'
})
export class FuncionarioFormComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router) {
      this.formGroup = this.formBuilder.group({
        nome:['', Validators.required],
        cep:['', Validators.required],
        cpf:['', Validators.required],
        cnpj:['', Validators.required],
        login:['', Validators.required],
        senha:['', Validators.required],
      }) 
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoFuncionario = this.formGroup.value;
      this.funcionarioService.create(novoFuncionario).subscribe({
        next: (funcionarioCadastrado) => {
          this.router.navigateByUrl('/funcionarios');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }
}
