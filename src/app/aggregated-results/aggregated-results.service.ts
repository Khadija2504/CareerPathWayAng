import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, map } from 'rxjs'; // Import map
import { AggregatedResult } from './aggregated-results.model';

@Injectable({
  providedIn: 'root'
})
export class AggregatedResultsService {

  private aggregatedResultsUrl = 'http://localhost:8800/api/admin/aggregated-results';
    
  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedin(): boolean {
    return !!this.getToken();
  }  

  private getHeaders(): HttpHeaders {
    const tokenString = this.getToken();
    if (tokenString) {
      try {
        const tokenObj = JSON.parse(tokenString);
        const jwtToken = tokenObj.token;
        if (jwtToken) {
          return new HttpHeaders({
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          });
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getAggregatedResults(): Observable<AggregatedResult[]> {
    const headers = this.getHeaders();
    console.log('Headers:', headers);

    return this.http.get<AggregatedResult[]>(this.aggregatedResultsUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching aggregated results:', error);
        return throwError(() => error);
      })
    );
  }

  getRankedAggregatedResults(): Observable<AggregatedResult[]> {
    return this.getAggregatedResults().pipe(
      map((results: AggregatedResult[]) => {
        results.forEach((result: AggregatedResult) => {
          result.rankingScore = this.calculateRankingScore(result);
        });
  
        results.sort((a: AggregatedResult, b: AggregatedResult) => {
          const scoreA = a.rankingScore || 0;
          const scoreB = b.rankingScore || 0;
          return scoreB - scoreA;
        });
  
        return results;
      }),
      catchError(error => {
        console.error('Error ranking aggregated results:', error);
        return throwError(() => error);
      })
    );
  }
  
  private calculateRankingScore(result: AggregatedResult): number {
    const careerPathWeight = 0.4;
    const skillAssessmentWeight = 0.3;
  
    return (
      result.careerPathProgressPercentage * careerPathWeight +
      result.skillAssessmentPercentage * skillAssessmentWeight
    );
  }
}
