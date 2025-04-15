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

  getAllMentors(): Observable<any> {

      return this.http.get<any>(`${this.baseMentorsUrl}`).pipe(
        catchError(error => {
          console.error('Error fetching methors list:', error);
          return throwError(() => error);
        })
      );
    }

  sendMessage(messageData: any): Observable<any> {
    return this.http.post<any>(`${this.baseMessagesUrl}/send`, messageData).pipe(
      catchError(error => {
        console.error('Error sending message:', error);
        return throwError(() => error);
      })
    );
  }

  getMessagesBetweenUsers(receiverId: number): Observable<any[]> {
    console.log(receiverId);
    return this.http.get<any[]>(`${this.baseMessagesUrl}/between?receiverId=${receiverId}`).pipe(
      catchError(error => {
        console.error('Error fetching messages list:', error);
        return throwError(() => error);
      })
    );
  }

  creatMentorship(mentorshipData: any): Observable<any>{
    return this.http.post<any[]>(`${this.mentorshipUrl}/employee/create-mentorship`, mentorshipData).pipe(
      catchError(error => {
        console.error('Error creating new mentorship:', error);
        if (error.status === 400 && error.error && Array.isArray(error.error)) {
          const validationErrors = error.error as string[];
          console.error('Validation errors:', validationErrors);
          return throwError(() => validationErrors);
        } else {
          return throwError(() => 'An unexpected error occurred. Please try again.');
        }
      })
    );
  }

  isMentorshipExist(mentorId: number) : Observable<boolean> {
    return this.http.post<boolean>(`${this.mentorshipUrl}/isMentorshipExist`, mentorId).pipe(
      catchError(error => {
        console.error('Error checking the availablaty of mentorship:', error);
        return throwError(() => error);
      })
    );
  }

  getAllEmployeeMentorships(): Observable <any>{
    return this.http.get<any>(`${this.mentorshipUrl}/user/getAllEmployeeMentorShips`).pipe(
      catchError(error => {
        console.error('Error fetching all od the mentorships:', error);
        return throwError(() => error);
      })
    );
  }

  getAllMentorMentorships(): Observable <any>{
    return this.http.get<any>(`${this.mentorshipUrl}/mentor/getAllMentorMentorShips`).pipe(
      catchError(error => {
        console.error('Error fetching all all metor mentorships:', error);
        return throwError(() => error);
      })
    );
  }

  updateMentorshipStatus(status: any, mentorhsipId: any): Observable<any>{
    return this.http.put<any[]>(`${this.mentorshipUrl}/mentor/updateMentorshipStatus/${mentorhsipId}`, status).pipe(
      catchError(error => {
        console.error('Error updating mentorship status:', error);
        return throwError(() => error);
      })
    );
  }

  createFeedback(feedbackData: any): Observable<any>{
    return this.http.post<any[]>(`${this.mentorshipUrl}/employee/mentorshipFeedback/create`, feedbackData).pipe(
      catchError(error => {
        console.error('Error creating new feedback:', error);
        return throwError(() => error);
      })
    );
  }

  getActiveMenteeMentorships(): Observable<any>{
    return this.http.get<any[]>(`${this.mentorshipUrl}/employee/getAllActiveMenteeMentorShips`).pipe(
      catchError(error => {
        console.error('Error fetching active mentee mentorships:', error);
        return throwError(() => error);
      })
    );
  }

  unreadMessages(): Observable<any>{
    return this.http.get<any[]>(`${this.baseMessagesUrl}/unread`).pipe(
      catchError(error => {
        console.error('Error fetching unread messages:', error);
        return throwError(() => error);
      })
    );
  }

  getUnreadMessagesBetweenUsers(receiverId: number): Observable<any[]> {
    console.log(receiverId);
    return this.http.get<any[]>(`${this.baseMessagesUrl}/between/unread?receiverId=${receiverId}`).pipe(
      catchError(error => {
        console.error('Error fetching unread messages list:', error);
        return throwError(() => error);
      })
    );
  }

  getMentorshipFeedbacks(mentorshipId: number): Observable<any>{
    return this.http.get<any[]>(`${this.mentorshipUrl}/mentor/getMentorshipFeedbacks/${mentorshipId}`).pipe(
      catchError(error => {
        console.error('Error fetching mentorship feedbacks:', error);
        return throwError(() => error);
      })
    );
  }
}
