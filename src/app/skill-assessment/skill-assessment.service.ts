import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class SkillAssessmentService {
  private baseSkillUrl = 'http://localhost:8800/api/employee/skills';
  private baseQuestionsUrm = 'http://localhost:8800/api/employee/questionnaires'
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

  getAllSkills(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseSkillUrl}/displaySkills`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching skills:', error);
        return throwError(() => error);
      })
    );
  }
  
  getQuestionnairesBySkillId(skillId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseQuestionsUrm}/skill/${skillId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching questionnaires:', error);
        return throwError(() => error);
      })
    );
  }
  
  submitQuestionnaireResponses(skillId: number, responses: string[]): Observable<any> {
    const headers = this.getHeaders();
    const requestBody = { skillId, responses };
    return this.http.post<any>(`${this.baseQuestionsUrm}/submit`, requestBody, { headers }).pipe(
      catchError(error => {
        console.error('Error submitting responses:', error);
        return throwError(() => error);
      })
    );
  }
  
  getAssessments(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.baseSkillUrl}/displayEmployeeSkillAssessment`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching assessment:', error);
        return throwError(() => error);
      })
    );
  }
}
