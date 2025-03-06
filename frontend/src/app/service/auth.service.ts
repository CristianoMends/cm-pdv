import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environment';
import Login from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.apiUrl+'users'
  private TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient) {}

  // Método de login que chama a API
  login(login:Login): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, login).pipe(
      tap(response => this.setToken(response.token.token))
    );
  }

  // Método para armazenar o token no localStorage
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Método para recuperar o token do localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Método para remover o token (logout)
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
