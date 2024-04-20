
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_DOMAIN } from './app-domin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  // Example service function to fetch user data from an API

  loginAdmin(resource: any): Observable<any> {
    return this.http.post<any>(`${API_DOMAIN}/login-admin`, resource).pipe(map(response => response.data));
  }

}
