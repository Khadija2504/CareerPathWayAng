import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private apiResourcesUrl = 'http://localhost:8800/api/resources';
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

  getAllResources(): Observable <any>{
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiResourcesUrl}/user/getAllResources`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching all resources:', error);
        return throwError(() => error);
      })
    );
  }

  addResource(resourceData: FormData): Observable<any> {
    const headers = this.getHeaders();
    console.log("JWT Token being sent:", headers.get('Authorization'));

    return this.http.post<any>(`${this.apiResourcesUrl}/admin/addResource`, resourceData, { headers }).pipe(
      catchError(error => {
        console.error('Error creating new resource:', error);
        return throwError(() => error);
      })
    );
  }

  deleteResource(resourceId: number): Observable <any>{
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiResourcesUrl}/admin/deleteResource/${resourceId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting resource:', error);
        return throwError(() => error);
      })
    );
  }
}
