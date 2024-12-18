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
  }

  mostrarMensagem(): void {
    this.mensagem = 'Obrigado por visitar o nosso site!';
    alert(this.mensagem);
  }
}
