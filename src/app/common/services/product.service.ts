import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  createProduct(product: Producto): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, product);
  }

  // Obtener todos los productos
  // getProducts(): Observable<Producto[]> {
  //   return this.http.get<Producto[]>(this.apiUrl);
  // }


    // Método para obtener productos filtrados
  getProducts(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    search?: string;
  }): Observable<Producto[]> {
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
    if (filters.brand) {
      params = params.set('brand', filters.brand);
    }
    if (filters.search) {
      params = params.set('search', filters.search);
    }

    // Enviar solicitud GET con parámetros de consulta
    return this.http.get<Producto[]>(this.apiUrl, { params });
  }

    // Obtener productos por userId
  getProductById(id: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/${id}`);
  }

  // Obtener productos por userId
  getProductsByUserId(userId: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/user/${userId}`);
  }

  getInactiveProductsByUserId(userId: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/user/${userId}/inactive`);
  }

  checkProductInOrders(productId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${productId}/check-orders`);
  }

  // Eliminar producto
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  // Actualizar producto
  updateProduct(productId: string, data: Partial<Producto>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, data);
  }
}
