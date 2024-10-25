import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Celular } from '../models/celular.model';


@Injectable({
  providedIn: 'root'
})
export class CelularService {
  private baseUrl = 'http://localhost:8080/Celular';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Celular[]> {
    return this.httpClient.get<Celular[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Celular> {
    return this.httpClient.get<Celular>(`${this.baseUrl}/${id}`); 
  }

  insert(Celular: Celular): Observable<Celular> {
    return this.httpClient.post<Celular>(this.baseUrl, Celular);
  }

  update(Celular: Celular): Observable<Celular> {
    return this.httpClient.put<any>(`${this.baseUrl}/${Celular.id}`, Celular); 
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`); 
  }

}
