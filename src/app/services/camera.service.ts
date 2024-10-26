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

  findAll(): Observable<Camera[]> {
    return this.httpClient.get<Camera[]>(this.baseUrl);
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
