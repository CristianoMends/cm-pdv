import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environment';
import Login from '../interface/login';
import { User } from '../interface/User';
import { isPlatformBrowser } from '@angular/common'; // Importe isPlatformBrowser
import Token from '../interface/Token';

@Injectable({
  providedIn: 'any'
})
export class AuthService {
  private API_URL = environment.apiUrl + 'users';
  private TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  // Método de login que chama a API
  login(login: Login, remember: boolean): Observable<Token> {
    return this.http.post<any>(`${this.API_URL}/login`, login).pipe(
      tap(response => {
        if (remember) {
          this.setTokenOnLocalStorage(response.token);
        } else {
          this.setTokenOnSessionStorage(response.token);
        }
      })
    );
  }

  saveUser() {

  }

  async hasTokenValid(): Promise<boolean> {
    if (!this.getToken()) { return false; }

    return new Promise((resolve) => {
      this.isValidToken().subscribe({
        next: () => resolve(true),
        error: () => resolve(false)
      });
    });
  }

  getLoggedUser(): Observable<User> {
    const token = this.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    return this.http.get<User>(`${this.API_URL}/me`, { headers });
  }

  // Método para armazenar o token no localStorage
  setTokenOnLocalStorage(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  setTokenOnSessionStorage(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Método para remover o token (logout)
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  isValidToken(): Observable<boolean> {
    const token = this.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return this.http.get<User>(`${this.API_URL}/validateToken`, { headers, responseType: 'json' }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

}
