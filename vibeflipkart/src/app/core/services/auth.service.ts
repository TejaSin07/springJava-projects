import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, AuthResponse } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private _user = new BehaviorSubject<User | null>(this.getSavedUser());
  
  isLoggedIn$ = this._isLoggedIn.asObservable();
  user$ = this._user.asObservable();
  
  constructor(private http: HttpClient) {}
  
  login(email: string, password: string): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => this.setSession(response)),
      map(response => response.user),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(() => new Error(error.error.message || 'Login failed'));
      })
    );
  }
  
  register(user: Partial<User>, password: string): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { ...user, password }).pipe(
      tap(response => this.setSession(response)),
      map(response => response.user),
      catchError(error => {
        console.error('Registration failed', error);
        return throwError(() => new Error(error.error.message || 'Registration failed'));
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this._isLoggedIn.next(false);
    this._user.next(null);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  isLoggedIn(): boolean {
    return this.hasToken();
  }
  
  getCurrentUser(): Observable<User | null> {
    if (!this.getToken()) {
      return of(null);
    }
    
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        this._user.next(user);
        localStorage.setItem(this.userKey, JSON.stringify(user));
      }),
      catchError(error => {
        console.error('Failed to get current user', error);
        this.logout();
        return of(null);
      })
    );
  }
  
  private setSession(authResult: AuthResponse): void {
    localStorage.setItem(this.tokenKey, authResult.token);
    localStorage.setItem(this.userKey, JSON.stringify(authResult.user));
    this._isLoggedIn.next(true);
    this._user.next(authResult.user);
  }
  
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
  
  private getSavedUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }
}