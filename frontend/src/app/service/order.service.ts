import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import Product from '../interface/Product';
import { Order } from '../interface/Order';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.apiUrl}orders`;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * Lista todos os produtos. Você pode adicionar parâmetros de consulta se necessário.
   * @param params Parâmetros de filtro para busca.
   */
  getAll(params: HttpParams = new HttpParams()): Observable<Order[]> {

    const token = this.authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    return this.http.get<Order[]>(this.apiUrl, { headers });
  }

  save(order: any) {
    return this.http.post(this.apiUrl, order);
  }
}
