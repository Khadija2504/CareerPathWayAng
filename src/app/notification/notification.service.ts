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

  getNotitfications() : Observable<any> {
    return this.http.get<any>(`${this.basenotif}/getNotifications`).pipe(
      catchError(error => {
        console.error('Error fetching notifs:', error);
        return throwError(() => error);
      })
    );
  }
  readNotifications() : Observable<any> {
    return this.http.get<any>(`${this.basenotif}/updateNotifications`).pipe(
      catchError(error => {
        console.error('Error updating notifs:', error);
        return throwError(() => error);
      })
    );
  }

  unreadNotifications() : Observable<any> {
    return this.http.get<any>(`${this.basenotif}/getUnreadNotifications`).pipe(
      catchError(error => {
        console.error('Error fetching unread notifs:', error);
        return throwError(() => error);
      })
    );
  }
}
