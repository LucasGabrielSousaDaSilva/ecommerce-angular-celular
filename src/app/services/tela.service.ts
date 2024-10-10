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

  findAll(): Observable<Tela[]> {
    return this.httpClient.get<Tela[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Tela> {
    return this.httpClient.get<Tela>(`${this.baseUrl}/${id}`); 
  }

  insert(Tela: Tela): Observable<Tela> {
    return this.httpClient.post<Tela>(this.baseUrl, Tela);
  }

  update(Tela: Tela): Observable<Tela> {
    return this.httpClient.put<any>(`${this.baseUrl}/${Tela.id}`, Tela); 
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`); 
  }

}
