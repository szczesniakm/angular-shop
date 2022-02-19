import { Injectable } from '@angular/core';
import { IJwtModel } from '../models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token: IJwtModel): void {
    console.log(JSON.stringify(token));
    localStorage.setItem('jwt', JSON.stringify(token));
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  clearToken(): void {
    localStorage.removeItem('jwt');
  }

  isTokenExpired(): boolean {
    let jwt = this.getToken();

    if(jwt) {
      let token: IJwtModel = JSON.parse(jwt);
      let expires: number = Date.parse(token.expires);

      if(Date.now() < expires)
        return false;
    }

    this.clearToken();
    return true;
  }
}
