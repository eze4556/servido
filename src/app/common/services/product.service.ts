import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root', // Esto asegura que sea singleton y evita conflictos de inyección
})
export class ProductService {
  private apiUrl = 'http://localhost:3333/products';

  constructor(
    private http: HttpClient
  ) {}

  createProduct(product: Producto): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, product);
  }
}
