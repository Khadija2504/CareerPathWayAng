import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenString = localStorage.getItem('token');

    let authReq = req;
    if (tokenString) {
      try {
        const tokenObj = JSON.parse(tokenString);
        const jwtToken = tokenObj.token;

        if (jwtToken) {
          authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${jwtToken}`
            }
          });
        }
      } catch (error) {
        console.error('Token parsing error in interceptor:', error);
      }
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error (interceptor):', error);
        return throwError(() => error);
      })
    );
  }
}
