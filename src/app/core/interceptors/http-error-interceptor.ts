import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  construct() {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let message = '';
        if (error instanceof ErrorEvent) {
            message = `Client-side error: ${error.error.message}`;
        } else {
            message = `Server-side error: ${error.status} ${error.message}`;
        }
        
        return throwError(message);
      })
    );
  }
}