
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service, ServiceDto } from '../interfaces/service.interface';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${API_URL}/services`);
  }

  createService(payload: ServiceDto): Observable<Service> {
    return this.http.post<Service>(`${API_URL}/services`, payload);
  }

  updateService(id: string, payload: Partial<ServiceDto>): Observable<Service> {
    return this.http.patch<Service>(`${API_URL}/services/${id}`, payload);
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/services/${id}`);
  }
}
