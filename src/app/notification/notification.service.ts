import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private basenotif = 'http://localhost:8800/api/notifications';

  constructor(private http: HttpClient) {}
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedin(): boolean {
    return !!this.getToken();
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

  getNotitfications() : Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.basenotif}/getNotifications`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching notifs:', error);
        return throwError(() => error);
      })
    );
  }
  readNotifications() : Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.basenotif}/updateNotifications`, { headers }).pipe(
      catchError(error => {
        console.error('Error updating notifs:', error);
        return throwError(() => error);
      })
    );
  }
}
