import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [MatCard, MatCardModule, ReactiveFormsModule],
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent {
  enderecoForm: FormGroup;

  constructor(private router: Router, private formbuilder: FormBuilder) {
    this.enderecoForm = this.formbuilder.group({
      endereco: ['', Validators.required]
    });
  }

  finalizarVenda() {
    if (this.enderecoForm.valid) {
      // Lógica para finalizar a venda
      console.log('Venda finalizada com sucesso!');
      // Redirecionar para a página de confirmação ou outra página desejada
      this.router.navigate(['/confirmacao-venda']);
    } else {
      console.log('Por favor, preencha o campo de endereço.');
    }
  }
}
