import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorShipService {
  private baseMentorsUrl = 'http://localhost:8800/api/user/allMentors';
  private baseMessagesUrl = 'http://localhost:8800/api/messages';
  private mentorshipUrl = 'http://localhost:8800/api/mentorship';


  constructor(private http: HttpClient) { }
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

  getAllMentors(): Observable<any> {
      const headers = this.getHeaders();
      return this.http.get<any>(`${this.baseMentorsUrl}`, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching methors list:', error);
          return throwError(() => error);
        })
      );
    }

  sendMessage(messageData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseMessagesUrl}/send`, messageData, { headers }).pipe(
      catchError(error => {
        console.error('Error sending message:', error);
        return throwError(() => error);
      })
    );
  }

  getMessagesBetweenUsers(receiverId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseMessagesUrl}/between?receiverId=${receiverId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching messages list:', error);
        return throwError(() => error);
      })
    );
  }

  creatMentorship(mentorshipData: any): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any[]>(`${this.mentorshipUrl}/create-mentorship`, mentorshipData, { headers }).pipe(
      catchError(error => {
        console.error('Error creating new mentorship:', error);
        return throwError(() => error);
      })
    );
  }

  isMentorshipExist(mentorId: number) : Observable<boolean> {
    const headers = this.getHeaders();
    return this.http.post<boolean>(`${this.mentorshipUrl}/isMentorshipExist`, mentorId, { headers }).pipe(
      catchError(error => {
        console.error('Error checking the availablaty of mentorship:', error);
        return throwError(() => error);
      })
    );
  }
}
