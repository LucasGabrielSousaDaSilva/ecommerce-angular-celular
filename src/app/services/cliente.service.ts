import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from "../models/cliente.model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = 'http://localhost:8080/clientes';

  constructor(private httpClient: HttpClient, private router: Router) { }
  
    // getClienteIdFromToken(): Observable<number> {
    //   const token = localStorage.getItem('token');
    //   if (!token) {
    //     throw new Error('Token não encontrado. Faça login novamente.');
    //   }
  
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //   return this.httpClient.get<number>(`${this.baseUrl}/cliente-id`, { headers });
    // }

  findAll(page?: number, pageSize?: number): Observable<Cliente[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      };
    }

    return this.httpClient.get<Cliente[]>(`${this.baseUrl}`, {params}); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  findById(id: string): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseUrl}/${id}`); 
  }

  insert(Cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.baseUrl, Cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    const data = {
      id: cliente.id,
      nome: cliente.nome,
      cep: cliente.cep,
      cpf: cliente.cpf,
      login: cliente.login,
      senha: cliente.senha
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${cliente.id}`, data); 
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`, {headers: this.getHeaders()}); 
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('Usuário não autenticado');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  alterarUsername(data: { usernameNovo: string; senha: string }): Observable<any> {
    const headers = this.getHeaders(); // Inclua os headers se necessário
    return this.httpClient.patch(`${this.baseUrl}/search/alterar-username`, data, { headers });
  }

  alterarSenha(data: { senhaAntiga: string; novaSenha: string }): Observable<any> {
    const headers = this.getHeaders(); // Certifique-se de que os headers de autenticação estão corretos.
    return this.httpClient.patch(`${this.baseUrl}/search/alterar-senha`, data, { headers });
  }

  insertUsuario(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(`${this.baseUrl}`, cliente, { headers: this.getHeaders() });
  }

  meuPerfil(id: number): Observable<any> {
    const headers = this.getHeaders(); // Certifique-se de que os headers de autenticação estão corretos.
    return this.httpClient.get(`${this.baseUrl}/search/meu-perfil/${id}`, { headers });
  }

  getClienteById(id: number): Observable<Cliente> {
    const headers = this.getHeaders(); // Certifique-se de que os headers de autenticação estão corretos.
    return this.httpClient.get<Cliente>(`${this.baseUrl}/clientes/${id}`, { headers });
  }

  getPedidosCliente(): Observable<any> {
    const headers = this.getHeaders(); // Certifique-se de que os headers de autenticação estão corretos.
    return this.httpClient.get(`${this.baseUrl}/dados/compras`, { headers });
  }

  findEndereco(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get(`${this.baseUrl}/endereco/find/${id}`, {headers})
  }
}
