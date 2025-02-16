import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8800/api/user';
  private baseGoalUrl = 'http://localhost:8800/api/employee/goal';
  private addGoalUrl = `${this.baseGoalUrl}/addGoal`;
  private getGoalsUrl = `${this.baseGoalUrl}/displayEmployeeGoals`;
  private updateGoalUrl = `${this.baseGoalUrl}/updateGoalStatus`;
  private updateGoalDetailsUrl = `${this.baseGoalUrl}/updateGoal`;
  private deleteGoalUrl = `${this.baseGoalUrl}/deleteGoal`;
  private getUserUrl = `${this.baseUrl}/details`;
  private updateUserUrl = `${this.baseUrl}/updateUserDetails`;
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

  getUserDetails(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.getUserUrl, {headers}).pipe(
      catchError(error => {
        console.error('Error fetching user details:', error);
        return throwError(() => error);
      })
    )
  }

  updateUserDetails(userData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(this.updateUserUrl, userData, { headers }).pipe(
      catchError(error => {
        console.error('Error updating user details:', error);
  
        const errorMessage = error?.error?.message || 'Failed to update user details. Please try again.';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  addGoal(goalData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.addGoalUrl, goalData, { headers }).pipe(
      catchError(error => {
        console.error('Error adding goal:', error);
        const errorMessage = error.error || 'Failed to add goal. Please try again.';

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getAllEmployeeGoals(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.getGoalsUrl, {headers}).pipe(
      catchError(error => {
        console.error('error fetching goals:', error);
        return throwError(()=> error);
      })
    )
  }

  
  updateGoalStatus(goalData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.updateGoalUrl, goalData, {headers}).pipe(
      catchError(error=> {
        console.error('error updating goal status: ', error);
        const errorMessage = error?.error?.message || 'failed to update goal status, plz try agin leater';
        return throwError(()=> new Error(errorMessage));
      })
    );
  }

  deleteGoal(goalId: number):Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.deleteGoalUrl, goalId, {headers}).pipe(
      catchError(error=> {
        console.error('error deleting this goal: ', error);
        const errorMessage = error?.error?.message || 'failed to delete this goal, plz try agin leater';
        return throwError(()=> new Error(errorMessage));
      })
    );
  }

  updateGoal(goalId: any, goalData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.updateGoalDetailsUrl}/${goalId}`, goalData, { headers }).pipe(
      catchError(error => {
        console.error('Error updating goal:', error);
        const errorMessage = error?.error?.message || 'Failed to update goal, please try again';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getGoalById(goalId: any): Observable<any> {
    const headers = this.getHeaders();
    console.log(goalId);
    
    return this.http.get<any>(`${this.baseGoalUrl}/getGoal/${goalId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching goal details:', error);
        const errorMessage = error?.error?.message || 'Failed to fetch goal details.';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
