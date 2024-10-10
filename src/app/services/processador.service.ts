import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Processador } from '../models/processador.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessadorService {
  private baseUrl = 'http://localhost:8080/telas';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Processador[]> {
    return this.httpClient.get<Processador[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Processador> {
    return this.httpClient.get<Processador>(`${this.baseUrl}/${id}`); 
  }
}
