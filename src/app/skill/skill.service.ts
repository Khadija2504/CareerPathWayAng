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

  getAllSkills(): Observable<any> {
    return this.http.get<any>(`${this.skillUrl}/displaySkills`).pipe(
      catchError(error => {
        console.error('Error fetching skills:', error);
        return throwError(() => error);
      })
    );
  }

  addSkill(skillData: any): Observable<any> {
    return this.http.post<any>(`${this.skillUrl}/admin/addSkill`, skillData).pipe(
      catchError(error => {
        console.error('Error creating skill:', error);
        return throwError(() => error);
      })
    );
  }

  updateSkill(skillData: Skill, skillId: number):Observable<any> {
    return this.http.put<any>(`${this.skillUrl}/admin/updateSkill/${skillId}`, skillData).pipe(
      catchError(error => {
        console.error('Error updating skill details:', error);
        return throwError(() => error);
      })
    );
  }

}
