import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { Funcionario } from '../../../models/funcionario.model';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, ReactiveFormsModule, MatCardModule, RouterModule],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.css'
})
export class FuncionarioFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        nome:['', Validators.required],
        cep:['', Validators.required],
        cpf:['', Validators.required],
        cnpj:['', Validators.required],
        login:['', Validators.required],
        senha:['', Validators.required],
      }) 
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    const funcionario: Funcionario = this.activatedRoute.snapshot.data['funcionario'];
  
    this.formGroup = this.formBuilder.group({
      id: [(funcionario && funcionario.id) ? funcionario.id : null],
      nome: [(funcionario && funcionario.nome) ? funcionario.nome : null],
      cep: [(funcionario && funcionario.cep) ? funcionario.cep : null],
      cpf: [(funcionario && funcionario.cpf) ? funcionario.cpf : null],
      cnpj: [(funcionario && funcionario.cnpj) ? funcionario.cnpj : null],
      login: [(funcionario && funcionario.login) ? funcionario.login : null],
      senha: [(funcionario && funcionario.senha) ? funcionario.senha : null],
    })
  
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoFuncionario = this.formGroup.value;
      this.funcionarioService.create(novoFuncionario).subscribe({
        next: (funcionarioCadastrado) => {
          this.router.navigateByUrl('/admin/funcionarios');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }
}
