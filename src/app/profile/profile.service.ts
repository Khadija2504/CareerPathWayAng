import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8800/api/user';
  private getUserUrl = `${this.baseUrl}/details`;
  private updateUserUrl = `${this.baseUrl}/updateUserDetails`;
  constructor(private http: HttpClient) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedin(): boolean {
    return !!this.getToken;
  }

  private getHeaders(): HttpHeaders {
    const tokenString = this.getToken();
    if(tokenString) {
      try {
        const tokenObj = JSON.parse(tokenString);
        const jwtToken = tokenObj.token;
        if(jwtToken) {
          return new HttpHeaders({
            Authorization: `Bearer ${jwtToken}`,
            'content-type' : 'application/json',
          });
        }
      } catch (error) {
        console.error('error parsing token:', error);
        return new HttpHeaders({
          'content-type' : 'application/json'
        });
      }
    }
    return new HttpHeaders({
      'content-type': 'application/json'
    });
  }

  getUserDetails(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.getUserUrl, {headers}).pipe(
      catchError(error => {
        console.error('Error fetching user details:', error);
        return throwError(() => error);
      })
    )
  }

  updateUserDetails(userData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(this.updateUserUrl, userData, { headers }).pipe(
      catchError(error => {
        console.error('Error updating user details:', error);
  
        const errorMessage = error?.error?.message || 'Failed to update user details. Please try again.';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
