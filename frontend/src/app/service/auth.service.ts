import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environment';
import Login from '../interface/login';
import { User } from '../interface/User';
import { isPlatformBrowser } from '@angular/common'; // Importe isPlatformBrowser
import Token from '../interface/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.apiUrl + 'users';
  private TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  // Método de login que chama a API
  login(login: Login): Observable<Token> {
    return this.http.post<any>(`${this.API_URL}/login`, login).pipe(
      tap(response => {
        this.setToken(response.token)       
      })
    );
  }

  getLoggedUser(): Observable<User> {
    const token = this.getToken();    
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return this.http.get<User>(`${this.API_URL}/logged`, { headers, responseType: 'json' });
  }

  // Método para armazenar o token no localStorage
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token); // Só executa no navegador
    }
  }

  // Método para recuperar o token do localStorage
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY); // Só executa no navegador
    }
    return null;
  }

  // Método para remover o token (logout)
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY); // Só executa no navegador
    }
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
