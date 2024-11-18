import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    // private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // if (this.loginForm.valid) {
    //   const username = this.loginForm.get('username')?.value;
    //   const password = this.loginForm.get('password')?.value;

      // this.authService.loginADM(username, password).subscribe ({
      //   next: (resp) => {
      //     // redirecionando para a pagina principal
      //     this.router.navigateByUrl('/admin');
      //   },
      //   error: (err) => {
      //     console.log(err);
      //     this.showSnackbarTopPosition("Username ou senha inválido");
      //   }
      // })

    }
// }

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
