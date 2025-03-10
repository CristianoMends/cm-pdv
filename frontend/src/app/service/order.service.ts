import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import Product from '../interface/Product';
import { Order } from '../interface/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.apiUrl}orders`;

  constructor(private http: HttpClient) { }


  /**
   * Lista todos os produtos. Você pode adicionar parâmetros de consulta se necessário.
   * @param params Parâmetros de filtro para busca.
   */
  getAll(): Observable<Order[]> {
    let httpParams = new HttpParams();
    return this.http.get<Order[]>(this.apiUrl, { params: httpParams });
  }
}
