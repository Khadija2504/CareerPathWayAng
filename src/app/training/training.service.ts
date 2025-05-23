import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private baseTrainingUrl = 'http://localhost:8800/api/training';
  private baseTrainingMenteeUrl = 'http://localhost:8800/api/mentee';

  constructor(private http: HttpClient) {}
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    isLoggedin(): boolean {
      return !!this.getToken();
    }  

  getRecommendations(): Observable<any> {
    return this.http.get<any>(`${this.baseTrainingUrl}/recommendations`).pipe(
      catchError(error => {
        console.error('Error fetching training programs with recommentations courses and resources:', error);
        return throwError(() => error);
      })
    )
  }

  getAdditionalTrainingPrograms(currentPage: number, pageSize: number): Observable<any> {
  
    const params = {
      page: currentPage.toString(),
      size: pageSize.toString()
    };
  
    return this.http.get<any>(`${this.baseTrainingUrl}/training-programs`, { params }).pipe(
      catchError(error => {
        console.error('Error fetching additional training programs:', error);
        return throwError(() => error);
      })
    );
  }

  addSteps(trainingSteps: any) : Observable<any> {
    return this.http.post<any> (`${this.baseTrainingUrl}/training-program-steps`, trainingSteps).pipe(
      catchError(error => {
        console.error('error during adding new steps:', error);
        return throwError(() => error)
      })
    );
  }

  getMenteeTrainingPrograms(menteeId: number): Observable<any> {
    console.log(menteeId);
    return this.http.get<any>(`${this.baseTrainingMenteeUrl}/mentee-training-program/${menteeId}`).pipe(
      catchError(error => {
        console.error('Error fetching mentee training programs:', error);
        return throwError(() => error);
      })
    );
  }
}
