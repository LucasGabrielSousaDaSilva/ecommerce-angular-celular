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

  findAll(): Observable<Processador[]> {
    return this.httpClient.get<Processador[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Processador> {
    return this.httpClient.get<Processador>(`${this.baseUrl}/${id}`); 
  }

  insert(Processador: Processador): Observable<Processador> {
    return this.httpClient.post<Processador>(this.baseUrl, Processador);
  }

  update(Processador: Processador): Observable<Processador> {
    return this.httpClient.put<any>(`${this.baseUrl}/${Processador.id}`, Processador); 
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`); 
  }
}
