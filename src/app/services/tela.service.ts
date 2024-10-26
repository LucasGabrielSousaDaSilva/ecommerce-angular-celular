import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tela } from '../models/tela.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelaService {
  private baseUrl = 'http://localhost:8080/telas';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Tela[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      };
    }

    return this.httpClient.get<Tela[]>(this.baseUrl); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  findById(id: string): Observable<Tela> {
    return this.httpClient.get<Tela>(`${this.baseUrl}/${id}`); 
  }

  create(tela: Tela): Observable<Tela> {
    return this.httpClient.post<Tela>(this.baseUrl, tela);
  }

  update(tela: Tela): Observable<Tela> {
    const data = {
      tamanho : tela.tamanho,
      resolucao : tela.resolucao,
    }
    return this.httpClient.put<Tela>(`${this.baseUrl}/${tela.id}`, data); 
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/telas/${id}`);
  }
  

}
