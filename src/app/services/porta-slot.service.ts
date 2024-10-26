import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortaSlot } from '../models/porta-slot.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortaSlotService {

  private baseUrl = 'http://localhost:8080/portaSlots'

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<PortaSlot[]> {
    return this.httpClient.get<PortaSlot[]>(this.baseUrl);
  }

  create(portaSlot: PortaSlot): Observable<PortaSlot> {
    return this.httpClient.post<PortaSlot>(this.baseUrl, portaSlot);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`); 
  }

  update(portaSlot: PortaSlot): Observable<PortaSlot> {
    const data = {
      tipo : portaSlot.tipo,
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${portaSlot.id}`, data); 
  }
  
}
