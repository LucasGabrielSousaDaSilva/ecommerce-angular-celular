import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoViaCep } from '../models/endereroViaCep';


@Injectable({
  providedIn: 'root'
})
export class CepService {

  private baseUrl = 'https://viacep.com.br/ws'

  constructor(private httpClient: HttpClient) { }

  getEnderecoByCep(cep: string): Observable<EnderecoViaCep> {
    return this.httpClient.get<EnderecoViaCep>(`${this.baseUrl}/${cep}/json`); 
  }
}