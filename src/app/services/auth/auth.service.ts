import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor() {}
  public isAuthenticated(): boolean {
    return localStorage.getItem('token') !== '';
  }
}
