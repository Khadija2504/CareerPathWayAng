import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private baseTrainingUrl = 'http://localhost:8800/api/training';

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

  getRecommendations(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseTrainingUrl}/recommendations`, {headers}).pipe(
      catchError(error => {
        console.error('Error fetching training programs with recommentations courses and resources:', error);
        return throwError(() => error);
      })
    )
  }

  getAdditionalTrainingPrograms(currentPage: number, pageSize: number): Observable<any> {
    const headers = this.getHeaders();
  
    const params = {
      page: currentPage.toString(),
      size: pageSize.toString()
    };
  
    return this.http.get<any>(`${this.baseTrainingUrl}/training-programs`, { headers, params }).pipe(
      catchError(error => {
        console.error('Error fetching additional training programs:', error);
        return throwError(() => error);
      })
    );
  }
}
