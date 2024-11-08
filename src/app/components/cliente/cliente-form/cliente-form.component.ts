import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from "../../../models/cliente.model";
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MatCardActions } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, ReactiveFormsModule,MatCardActions, MatCardContent, MatCardTitle, MatCard, MatIcon, MatTable, MatToolbar],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router) {
      this.formGroup = this.formBuilder.group({
        nome:['', Validators.required],
        cep:['', Validators.required],
        cpf:['' , Validators.required]
      }) 
  }
  onSubmit() {
    if (this.formGroup.valid) {
      const novoCliente = this.formGroup.value;
      this.clienteService.insert(novoCliente).subscribe({
        next: (clienteCadastrado) => {
          this.router.navigateByUrl('/admin/clientes');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }
}
