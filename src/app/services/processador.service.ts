import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Processador } from '../models/processador.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessadorService {
  private baseUrl = 'http://localhost:8080/processadores';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Processador[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      };
    }
    return this.httpClient.get<Processador[]>(`${this.baseUrl}`, {params}); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  findById(id: string): Observable<Processador> {
    return this.httpClient.get<Processador>(`${this.baseUrl}/${id}`); 
  }

  insert(processador: Processador): Observable<Processador> {
    return this.httpClient.post<Processador>(this.baseUrl, processador);
  }

  update(processador: Processador): Observable<Processador> {
    const data = {
      marca : processador.marca,
      modelo : processador.modelo,
    }
    return this.httpClient.put<Processador>(`${this.baseUrl}/${processador.id}`, data); 
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`); 
  }
}
