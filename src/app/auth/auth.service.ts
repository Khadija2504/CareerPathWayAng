import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8800/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {      
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));        
        return decodedToken.role;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.roles || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  logout() {
    localStorage.removeItem('token');
  }

}
