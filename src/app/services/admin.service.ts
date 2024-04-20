

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { API_DOMAIN } from './app-domin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {




  constructor(private http: HttpClient) { }
  // Example service function to fetch user data from an API
  private specializations$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private specializationsLoaded: boolean = false;

  getSpecializations(): Observable<any> {
    if (!this.specializationsLoaded) {
      this.http.get<any>(`${API_DOMAIN}/get-specializations`).pipe(
        map(response => response.data),
        shareReplay(1)
      ).subscribe(data => {
        this.specializations$.next(data);
        this.specializationsLoaded = true;
      });
    }
    return this.specializations$;
  }
  getUsers(page: number): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/get-users-admin?page=${page}`, { headers }).pipe(map(response => response.data));
  }
  getCompany(id: string): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/get-company-admin?id=${id}`, { headers }).pipe(map(response => response.data));
  }
  getUser(id: string): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/get-user-admin?id=${id}`, { headers }).pipe(map(response => response.data));
  }
  getJob(id: string): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/get-job-admin?id=${id}`, { headers }).pipe(map(response => response.data));
  }
  getCompanies(page: number): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/get-companies-admin?page=${page}`, { headers }).pipe(map(response => response.data));
  }
  getallCompanies(): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/get-all-companies-admin`, { headers }).pipe(map(response => response.data));
  }
  getJobsAdmin(page: number): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/get-jobs-admin?page=${page}`, { headers }).pipe(map(response => response.data));
  }
  getApplicants(page: number): Observable<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${API_DOMAIN}/get-applicants-admin?page=${page}`, { headers }).pipe(map(response => response.data));
  }
  DeleteCompany(_id: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${API_DOMAIN}/delete-company-admin?id=${_id}`, { headers }).pipe(map(response => response.data));
  }
  DeleteApplicant(_id: any, username: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${API_DOMAIN}/delete-applicant-admin?id=${_id}&username=${username}`, { headers }).pipe(map(response => response.data));
  }
  DeleteJob(_id: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${API_DOMAIN}/delete-job-admin?id=${_id}`, { headers }).pipe(map(response => response.data));
  }
  DeleteUser(_id: string, username: string) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${API_DOMAIN}/delete-user-admin?id=${_id}&username=${username}`, { headers }).pipe(map(response => response.data));
  }
  CreateUser(resource: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${API_DOMAIN}/create-user-byadmin`, resource, { headers }).pipe(map(response => response.data));
  }
  CreateCompany(resource: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${API_DOMAIN}/create-company-byadmin`, resource, { headers }).pipe(map(response => response.data));
  }
  CreateJob(resource: any) {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${API_DOMAIN}/create-job-byadmin`, resource, { headers }).pipe(map(response => response.data));
  }
  UpdateUser(resource: any, id: string) {
    {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error('No token found');
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put<any>(`${API_DOMAIN}/update-user-byadmin?id=${id}`, resource, { headers }).pipe(map(response => response.data));
    }
  }
  UpdateCompany(resource: any, id: string) {
    {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error('No token found');
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put<any>(`${API_DOMAIN}/update-company-byadmin?id=${id}`, resource, { headers }).pipe(map(response => response.data));
    }
  }
  UpdateJob(resource: any, id: string) {
    {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error('No token found');
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put<any>(`${API_DOMAIN}/update-job-byadmin?id=${id}`, resource, { headers }).pipe(map(response => response.data));
    }
  }
}
