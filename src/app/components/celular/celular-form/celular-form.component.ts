import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CelularService } from '../../../services/celular.service';

@Component({
  selector: 'app-celular-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './celular-form.component.html',
  styleUrl: './celular-form.component.css'
})
export class CelularFormComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private celularService: CelularService,
    private router: Router,
  private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        nome:['', Validators.required],
        preco:['', Validators.required],
        estoque:['', Validators.required]
      }) 
  }
  onSubmit() {
    if (this.formGroup.valid) {
      const novoCelular = this.formGroup.value;
      this.celularService.insert(novoCelular).subscribe({
        next: (celularCadastrado) => {
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
