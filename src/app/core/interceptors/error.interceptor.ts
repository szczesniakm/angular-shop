import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpError } from '../models/http-error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error instanceof HttpErrorResponse) {
          if(error.status == 400) {
            let httpError = error.error;
            return throwError(() => new HttpError(httpError.code, httpError.message));
          }
        }

        return throwError(() => error);
      }))
  }
}
