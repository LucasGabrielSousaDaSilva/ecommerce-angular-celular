import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from '../models/sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private baseUrl = 'http://localhost:8080/Sensor';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Sensor[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      };
    }

    return this.httpClient.get<Sensor[]>(`${this.baseUrl}`, {params}); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  findById(id: string): Observable<Sensor> {
    return this.httpClient.get<Sensor>(`${this.baseUrl}/${id}`); 
  }

  create(sensor: Sensor): Observable<Sensor> {
    return this.httpClient.post<Sensor>(this.baseUrl, sensor);
  }

  update(sensor: Sensor): Observable<Sensor> {
    const data = {
      tipo : sensor.tipo,
    }
    return this.httpClient.put<Sensor>(`${this.baseUrl}/${sensor.id}`, data); 
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/sensores/${id}`);
  }
}
