import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venda',
  standalone: true,
  imports: [MatCard, MatCardModule],
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent {
  constructor(private router: Router) {}

  finalizarVenda() {
    // Lógica para finalizar a venda
    console.log('Venda finalizada com sucesso!');
    // Redirecionar para a página de confirmação ou outra página desejada
    this.router.navigate(['/confirmacao-venda']);
  }
}
