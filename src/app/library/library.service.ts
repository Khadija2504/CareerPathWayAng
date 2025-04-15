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

  getAllResources(): Observable <any>{
    return this.http.get<any>(`${this.apiResourcesUrl}/user/getAllResources`).pipe(
      catchError(error => {
        console.error('Error fetching all resources:', error);
        return throwError(() => error);
      })
    );
  }

  addResource(resourceData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiResourcesUrl}/admin/addResource`, resourceData).pipe(
      catchError(error => {
        console.error('Error creating new resource:', error);
        return throwError(() => error);
      })
    );
  }

  deleteResource(resourceId: number): Observable <any>{
    return this.http.get<any>(`${this.apiResourcesUrl}/admin/deleteResource/${resourceId}`).pipe(
      catchError(error => {
        console.error('Error deleting resource:', error);
        return throwError(() => error);
      })
    );
  }
}
