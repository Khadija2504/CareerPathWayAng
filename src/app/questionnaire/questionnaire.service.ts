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

  createQuestionnaire(questionnaireData: any): Observable<any> {
    return this.http.post<any>(`${this.questionUrl}/admin/createQuestionnaire`, questionnaireData).pipe(
      catchError(error => {
        console.error('Error creating new questionnaire:', error);
        return throwError(() => error);
      })
    );
  }

  getAllQuestionnaires(): Observable<any> {
    return this.http.get<any>(`${this.questionUrl}/admin/getAllQuestionnaires`).pipe(
      catchError(error => {
        console.error('Error fetching questionnaires:', error);
        return throwError(() => error);
      })
    );
  }

  getAllSkillss(): Observable<any> {
    return this.http.get<any>(`${this.skillUrl}/displaySkills`).pipe(
      catchError(error => {
        console.error('Error fetching skills:', error);
        return throwError(() => error);
      })
    );
  }

  deleteQuestionnaire(id: number): Observable<any> {
    return this.http.get<any>(`${this.questionUrl}/admin/deleteQuestionnaire/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting questionnaire:', error);
        return throwError(() => error);
      })
    );
  }
}
