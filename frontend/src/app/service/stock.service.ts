import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import Product from '../interface/Product';
import Stock from '../interface/Stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = `${environment.apiUrl}stock`;

  constructor(private http: HttpClient) { }

  /**
   * Lista todos os produtos. Você pode adicionar parâmetros de consulta se necessário.
   * @param params Parâmetros de filtro para busca.
   */
  getStock(): Observable<Stock[]> {
    let httpParams = new HttpParams();
    return this.http.get<Stock[]>(this.apiUrl, { params: httpParams });
  }
}
