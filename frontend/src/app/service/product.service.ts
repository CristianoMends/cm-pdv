import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import Product from '../interface/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}products`;

  constructor(private http: HttpClient) { }

  /**
   * Busca um produto pelo ID.
   * @param id Identificador único do produto.
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /**
   * Lista todos os produtos. Você pode adicionar parâmetros de consulta se necessário.
   * @param params Parâmetros de filtro para busca.
   */
  getAllProducts(): Observable<Product[]> {
    let httpParams = new HttpParams();
    return this.http.get<Product[]>(this.apiUrl, { params: httpParams });
  }
}
