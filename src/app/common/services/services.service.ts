import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/services.model'; // Asegúrate de tener este modelo creado

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  private apiUrl = 'http://localhost:3000/services';

  constructor(private http: HttpClient) {}

  // Crear un servicio
  createService(service: Servicio): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, service);
  }

  // Obtener todos los servicios
  getServices(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }): Observable<Servicio[]> {
    let params = new HttpParams();

    // Agregar filtros a los parámetros de consulta
    if (filters.category) {
      params = params.set('category', filters.category);
    }
    if (filters.minPrice) {
      params = params.set('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice) {
      params = params.set('maxPrice', filters.maxPrice.toString());
    }
    if (filters.search) {
      params = params.set('search', filters.search);
    }

    // Enviar solicitud GET con parámetros de consulta
    return this.http.get<Servicio[]>(this.apiUrl, { params });
  }

  // Obtener un servicio por ID
  getServiceById(id: string): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`);
  }

  // Obtener servicios por userId
  getServicesByUserId(userId: string): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Eliminar un servicio
  deleteService(serviceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${serviceId}`);
  }

  // Actualizar un servicio
  updateService(serviceId: string, updatedService: Partial<Servicio>) {
    return this.http.put<Servicio>(`${this.apiUrl}/${serviceId}`, updatedService);
  }
}
