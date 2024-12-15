import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  responsaveis: Array<{ id: number; nome: string; funcao: string; email: string }> = [];
  mensagem: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch data from Quarkus back-end
    this.http.get<{ id: number; nome: string; funcao: string; email: string }[]>('/api/responsaveis')
      .subscribe(
        data => this.responsaveis = data,
        error => console.error('Erro ao buscar os responsáveis:', error)
      );
  }

  mostrarMensagem(): void {
    this.mensagem = 'Obrigado por visitar o nosso site!';
  }

  verDetalhes(id: number): void {
    alert(`Exibindo detalhes do responsável com ID: ${id}`);
  }
}
