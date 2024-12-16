import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  cadastroForm!: FormGroup;
  perfilStyle = 1;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('onSubmit called'); // Log inicial

    if (this.loginForm.valid) {
        console.log('Form is valid'); // Log para verificar a validade do formulário

        const username = this.loginForm.get('username')?.value;
        const senha = this.loginForm.get('senha')?.value;
        const perfil = this.perfilStyle;

        console.log('Username:', username); // Log do valor do username
        console.log('Senha:', senha); // Log do valor da senha (Evite isso em produção!)

        this.authService.login(username, senha, perfil).subscribe({
            next: (resp) => {
                console.log('Login successful:', resp); // Log da resposta de sucesso

                this.router.navigateByUrl('/user');
            },
            error: (err) => {
                console.error('Login error:', err); // Log do erro
                this.showSnackbarTopPosition('Username ou senha inválido');
            }
        });
    } else {
        console.warn('Form is invalid'); // Log caso o formulário não seja válido
    }
}

    onRegister() {
      // criar usuário
    }
  
    showSnackbarTopPosition(content: any) {
      this.snackBar.open(content, 'fechar', {
        duration: 3000,
        verticalPosition: "top",
        horizontalPosition: "center"
      });
    }

}
