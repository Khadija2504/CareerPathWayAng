import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CareerPath } from './create-career-path/career-path.model';

@Injectable({
  providedIn: 'root'
})
export class CareerPathService {

  private apiCareerPathUrl = 'http://localhost:8800/api/careerPath';
  private apiUserhUrl = 'http://localhost:8800/api/user';
  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedin(): boolean {
    return !!this.getToken();
  }  

  private getHeaders(): HttpHeaders {
    const tokenString = this.getToken();
    if (tokenString) {
      try {
        const tokenObj = JSON.parse(tokenString);
        const jwtToken = tokenObj.token;
        if (jwtToken) {
          return new HttpHeaders({
            Authorization: `Bearer ${jwtToken}`,
          });
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        return new HttpHeaders();
      }
    }
    return new HttpHeaders();
  }
  createCareerPath(careerPath: CareerPath): Observable<any> {
    const headers = this.getHeaders();
    console.log('JWT Token being sent:', headers.get('Authorization'));

    return this.http
      .post<any>(`${this.apiCareerPathUrl}/admin/create-careerPath`, careerPath, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error creating new career path:', error);
          return throwError(() => error);
        })
      );
  }

  loadEmployees(): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get<any>(`${this.apiUserhUrl}/allEmployees`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching employees:', error);
          return throwError(() => error);
        })
      );
  }

  loadCareerPaths(): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get<any>(`${this.apiCareerPathUrl}/admin/getAllCareerPaths`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching employee careerPaths:', error);
          return throwError(() => error);
        })
      );
  }

  loadEmployeeCareerPaths(): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get<any>(`${this.apiCareerPathUrl}/employee/getAllCareerPaths`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching employee careerPaths:', error);
          return throwError(() => error);
        })
      );
  }
   
}
