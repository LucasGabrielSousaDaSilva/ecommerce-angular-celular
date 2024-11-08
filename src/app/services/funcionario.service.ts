import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private baseUrl = 'http://localhost:8080/funcionarios'

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Funcionario[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      };
    }

    return this.httpClient.get<Funcionario[]>(`${this.baseUrl}`, {params}); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  create(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.baseUrl, funcionario);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`); 
  }

  update(funcionario: Funcionario): Observable<Funcionario> {
    const data = {
      nome: funcionario.nome,
      cep: funcionario.cep,
      cpf: funcionario.cpf,
      cnpj: funcionario.cnpj,
      login: funcionario.login,
      senha: funcionario.senha
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${funcionario.id}`, data); 
  }
  
}
