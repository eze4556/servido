import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from '../models/users.models';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'https://backservido.onrender.com/usuarios';

  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<UserI> {
    return this.http.get<UserI>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: string, userData: any): Observable<UserI> {
    return this.http.put<UserI>(`${this.apiUrl}/${id}`, userData);
  }
}
