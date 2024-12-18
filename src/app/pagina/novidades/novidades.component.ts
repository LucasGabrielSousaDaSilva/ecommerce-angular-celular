import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-novidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './novidades.component.html',
  styleUrl: './novidades.component.css'
})
export class NovidadesComponent {
  resposta: string | null = null;

  responder(resposta: string) {
    this.resposta = resposta;
  }
}
