import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrlEmployee = 'http://localhost:8800/api/courses/employee';
  private apiUrlAdmin = 'http://localhost:8800/api/courses/admin';
  private apiUrl = 'http://localhost:8800/api/courses';

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

  getAllCourses(): Observable <any>{
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrlEmployee}/displayAllCourses`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching all of the courses:', error);
        return throwError(() => error);
      })
    );
  }

  addCourse(courseData: any): Observable<any> {
    const headers = this.getHeaders();
    console.log("JWT Token being sent:", headers.get('Authorization'));

    return this.http.post<any>(`${this.apiUrlAdmin}/createCourse`, courseData, { headers }).pipe(
        catchError(error => {
            console.error('Error creating new course:', error);
            return throwError(() => error);
        })
    );
  }

  updateCourse(courseData: any, courseId: any): Observable<any> {
    const headers = this.getHeaders();
    console.log(courseId);
    
    return this.http.put<any>(`${this.apiUrlAdmin}/updateCourse/${courseId}`, courseData, { headers }).pipe(
        catchError(error => {
            console.error('Error updating this course:', error);
            return throwError(() => error);
        })
    );
  }

  getCourseById(courseId: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/getCourseById/${courseId}`, { headers }).pipe(
        catchError(error => {
            console.error('Error displaying this course:', error);
            return throwError(() => error);
        })
    );
  }
}