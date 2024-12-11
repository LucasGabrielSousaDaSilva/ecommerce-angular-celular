import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Serie } from '../models/serie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SerieService {
  private baseUrl = 'http://localhost:8080/Serie';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Serie[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      };
    }

    return this.httpClient.get<Serie[]>(`${this.baseUrl}`, {params}); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  findById(id: string): Observable<Serie> {
    return this.httpClient.get<Serie>(`${this.baseUrl}/${id}`); 
  }

  create(serie: Serie): Observable<Serie> {
    return this.httpClient.post<Serie>(this.baseUrl, serie);
  }

  update(serie: Serie): Observable<Serie> {
    const data = {
      nome : serie.nome,
      anoLancamento : serie.anoLancamento
    }
    return this.httpClient.put<Serie>(`${this.baseUrl}/${serie.id}`, data); 
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/series/${id}`);
  }
}
