import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpError } from '../models/http-error';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(
      private http: HttpClient,
      private jwtService: JwtService
    ) { 
      this.isAuthenticated.next(!this.jwtService.isTokenExpired());
    }

  async login(email: string, password: string): Promise<void> {
    return new Promise((resolve, rejects) => {this.http.post<any>(`${environment.apiEndpoint}accounts/login`, {email: email, password: password}).subscribe(
      data => {
        this.jwtService.setToken(data),
        this.isAuthenticated.next(true)
        resolve();
      },
      err => rejects(err)
    )});
  }

  async logout(): Promise<void> {
    this.jwtService.clearToken();
    this.isAuthenticated.next(false);
    return new Promise(resolve => resolve());
  }

  isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
