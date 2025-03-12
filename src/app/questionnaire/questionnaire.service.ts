import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private questionUrl = 'http://localhost:8800/api/employee/questionnaires';
  private skillUrl = 'http://localhost:8800/api/employee/skills';
  
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

  createQuestionnaire(questionnaireData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.questionUrl}/admin/createQuestionnaire`, questionnaireData, { headers }).pipe(
      catchError(error => {
        console.error('Error creating new questionnaire:', error);
        return throwError(() => error);
      })
    );
  }

  getAllQuestionnaires(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.questionUrl}/admin/getAllQuestionnaires`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching questionnaires:', error);
        return throwError(() => error);
      })
    );
  }

  getAllSkillss(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.skillUrl}/displaySkills`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching skills:', error);
        return throwError(() => error);
      })
    );
  }

  deleteQuestionnaire(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.questionUrl}/admin/deleteQuestionnaire/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting questionnaire:', error);
        return throwError(() => error);
      })
    );
  }
}
