import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, RouterModule, ReactiveFormsModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginADMComponent implements OnInit {
  loginForm!: FormGroup;
  cadastroForm!: FormGroup;
  perfilStyle = 2;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('onSubmit called'); // Log inicial

    if (this.loginForm.valid) {
      console.log('Form is valid'); // Log para verificar a validade do formulário

      const username = this.loginForm.get('username')?.value;
      const senha = this.loginForm.get('senha')?.value;
      const perfil = this.perfilStyle;

      console.log('username:', username); // Log do valor do login
      console.log('Senha:', senha); // Log do valor da senha (Evite isso em produção!)

      // Login exclusivo para funcionários
      this.authService.login(username, senha, perfil).subscribe({
        next: (resp) => {
          console.log('Login bem-sucedido:', resp); // Log da resposta de sucesso

          this.router.navigateByUrl('/admin/controle'); // Redirecionar após login bem-sucedido
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err); // Log de erro
          this.snackBar.open('Login como funcionário falhou', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
    });
    }
  }

  onRegister() {
    // criar usuário
  }
}
