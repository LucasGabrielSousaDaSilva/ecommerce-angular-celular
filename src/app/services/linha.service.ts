import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Linha } from '../models/linha.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LinhaService {
  private baseUrl = 'http://localhost:8080/Linha';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Linha[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      };
    }

    return this.httpClient.get<Linha[]>(`${this.baseUrl}`, {params}); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  findById(id: string): Observable<Linha> {
    return this.httpClient.get<Linha>(`${this.baseUrl}/${id}`); 
  }

  create(linha: Linha): Observable<Linha> {
    return this.httpClient.post<Linha>(this.baseUrl, linha);
  }

  update(linha: Linha): Observable<Linha> {
    const data = {
      nome : linha.nome,
      anoLancamento : linha.anoLancamento
    }
    return this.httpClient.put<Linha>(`${this.baseUrl}/${linha.id}`, data); 
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/linhas/${id}`);
  }
}
