import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import Product from '../interface/Product';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}products`;
  private token = 'auth';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

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

  addProduct(product: any, file: any): Observable<any> {

    const formData = new FormData();
    formData.append('productDto', JSON.stringify(product));
    formData.append('image', file);
    const token = this.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return this.http.post<any>(`${this.apiUrl}`, formData, { headers });
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.token); // Só executa no navegador
    }
    return null;
  }

  addCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/category`, { 'name': category });
  }

  getCategories(): Observable<any> {
    let httpParams = new HttpParams();
    return this.http.get<any>(`${this.apiUrl}/category`, { params: httpParams });
  }
}
