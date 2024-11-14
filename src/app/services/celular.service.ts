import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Celular } from '../models/celular.model';


@Injectable({
  providedIn: 'root'
})
export class CelularService {
  private baseUrl = 'http://localhost:8080/celulares';

  constructor(private httpClient: HttpClient) { }

  getUrlImage(nomeImagem: string): string {
    return `${this.baseUrl}/image/download/${nomeImagem}`; 
  }

  findAll(page?: number, pageSize?: number): Observable<Celular[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      };
    }

    return this.httpClient.get<Celular[]>(`${this.baseUrl}`, {params}); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  // findAll(page?: number, pageSize?: number): Observable<Celular[]> {
  //   return this.httpClient.get<Celular[]>(this.baseUrl); 
  // }

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

