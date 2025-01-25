import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {

  private apiUrl = 'http://localhost:3000/subscription';

  constructor(private http: HttpClient) {}

  createSubscription(subData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, subData);
  }


}
