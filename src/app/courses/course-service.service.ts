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

  getAllCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlEmployee}/displayAllCourses`).pipe(
      catchError(error => {
        console.error('Error fetching all courses:', error);
        return throwError(() => error);
      })
    );
  }

  addCourse(courseData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrlAdmin}/createCourse`, courseData).pipe(
      catchError(error => {
        console.error('Error creating new course:', error);
        return throwError(() => error);
      })
    );
  }

  updateCourse(courseData: any, courseId: any): Observable<any> {
    console.log(courseId);

    return this.http.put<any>(`${this.apiUrlAdmin}/updateCourse/${courseId}`, courseData).pipe(
      catchError(error => {
        console.error('Error updating this course:', error);
        return throwError(() => error);
      })
    );
  }

  getCourseById(courseId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCourseById/${courseId}`).pipe(
      catchError(error => {
        console.error('Error displaying this course:', error);
        return throwError(() => error);
      })
    );
  }
}