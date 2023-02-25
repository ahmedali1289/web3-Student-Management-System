import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }
  getToken() {
    return !!localStorage.getItem("access_token");
  }
  login(value:string, token:string, routes:any){
    localStorage.setItem('token',token)
    localStorage.setItem('role',value)
    localStorage.setItem('routes',JSON.stringify(routes))
  }
  isLoggedIn(): boolean {
    let loggedIn: boolean = false;
    let expiration = this.getExpiration();

    if (expiration) {
      return Date.now() < expiration;
    }
    return loggedIn;
  }
  private getExpiration(): number {
    let expiresAt: any = null;

    const expiration = localStorage.getItem("expires_at");

    if (expiration) {
      expiresAt = JSON.parse(expiration);
    }

    return expiresAt;
  }
}