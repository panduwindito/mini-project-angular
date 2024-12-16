import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogin = false;

  login() {
    this.isLogin = true;
  }

  logout() {
    this.isLogin = false;
  }

  getStatus(){
    return this.isLogin;
  }

  constructor() { }
}
