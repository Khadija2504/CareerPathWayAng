import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillAssessmentService {
  private baseSkillUrl = 'http://localhost:8800/api/employee/skills';
  private baseQuestionsUrm = 'http://localhost:8800/api/employee/questionnaires';
   constructor(private http: HttpClient) {}
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    isLoggedin(): boolean {
      return !!this.getToken();
    }  
  
  getAllSkills(): Observable<any> {
    return this.http.get<any>(`${this.baseSkillUrl}/displaySkills`).pipe(
      catchError(error => {
        console.error('Error fetching skills:', error);
        return throwError(() => error);
      })
    );
  }
  
  getQuestionnairesBySkillId(skillId: number): Observable<any> {
    return this.http.get<any>(`${this.baseQuestionsUrm}/skill/${skillId}`).pipe(
      catchError(error => {
        console.error('Error fetching questionnaires:', error);
        return throwError(() => error);
      })
    );
  }
  
  submitQuestionnaireResponses(skillId: number, responses: string[]): Observable<any> {
    const requestBody = { skillId, responses };
    return this.http.post<any>(`${this.baseQuestionsUrm}/submit`, requestBody).pipe(
      catchError(error => {
        console.error('Error submitting responses:', error);
        return throwError(() => error);
      })
    );
  }
  
  getAssessments(): Observable<any> {
    return this.http.get<any>(`${this.baseSkillUrl}/displayEmployeeSkillAssessment`).pipe(
      catchError(error => {
        console.error('Error fetching assessment:', error);
        return throwError(() => error);
      })
    );
  }
}
