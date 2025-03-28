import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera } from '../models/camera.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private baseUrl = 'http://localhost:8080/cameras'

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Camera[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      };
    }

    return this.httpClient.get<Camera[]>(`${this.baseUrl}`, {params}); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  findById(id: string): Observable<Camera> {
    return this.httpClient.get<Camera>(`${this.baseUrl}/${id}`); 
  }

  create(camera: Camera): Observable<Camera> {
    return this.httpClient.post<Camera>(this.baseUrl, camera);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`); 
  }

  update(camera: Camera): Observable<Camera> {
    const data = {
      resolucao : camera.resolucao,
      frontal : camera.frontal
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${camera.id}`, data); 
  }
  
}
