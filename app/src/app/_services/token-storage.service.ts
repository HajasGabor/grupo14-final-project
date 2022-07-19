import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const IS_ADMIN = 'auth-admin';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any, isAdmin: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(IS_ADMIN);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem(IS_ADMIN, JSON.stringify(isAdmin));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log(USER_KEY);
    if (user) {
      console.log(user);
      return JSON.parse(user);
    }
    return {};
  }

  public getIsAdmin(): any {
    const isAdmin = window.sessionStorage.getItem(IS_ADMIN);
    console.log(IS_ADMIN);
    if (isAdmin) {
      console.log(isAdmin);
      return JSON.parse(isAdmin);
    }
    return {};
  }
}
