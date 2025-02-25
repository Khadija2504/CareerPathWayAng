import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8800/api/courses/employee';

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

  getAllCourses(): Observable <any>{
      const headers = this.getHeaders();
      return this.http.get<any>(`${this.apiUrl}/displayAllCourses`, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching all of the courses:', error);
          return throwError(() => error);
        })
      );
    }
}