import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Skill } from './skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

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

  getAllSkills(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.skillUrl}/displaySkills`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching skills:', error);
        return throwError(() => error);
      })
    );
  }

  addSkill(skillData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.skillUrl}/admin/addSkill`, skillData, { headers }).pipe(
      catchError(error => {
        console.error('Error creating skill:', error);
        return throwError(() => error);
      })
    );
  }

  deleteSkill(skillId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.skillUrl}/admin/deleteSkill/${skillId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting skill with id:' + skillId, error);
        return throwError(() => error);
      })
    );
  }

  updateSkill(skillData: Skill, skillId: number):Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.skillUrl}/admin/updateSkill/${skillId}`, skillData, { headers }).pipe(
      catchError(error => {
        console.error('Error updating skill details:', error);
        return throwError(() => error);
      })
    );
  }

}
