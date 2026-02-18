import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.isLoggedIn.set(!!token);
  }

  login(username: string, pwd: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { username, pwd })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.user.role);
          this.isLoggedIn.set(true);
        })
      );
  }

  getRole(): 'USER' | 'ADMIN' {
    return (localStorage.getItem('role') as 'USER' | 'ADMIN') || 'USER';
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
