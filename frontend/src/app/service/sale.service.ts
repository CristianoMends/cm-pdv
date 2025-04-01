import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CreateSale from '../interface/CreateSale';
import ViewSale from '../interface/ViewSale';
import { Observable } from 'rxjs';
import { toZonedTime, format } from 'date-fns-tz';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl: string | undefined;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl
  }


  removeSale(id: number) {
    const res = this.http.delete<ViewSale>(`${this.apiUrl}/${id}`);

    res.subscribe({
      next: (res) => {
        console.log('Sale deleted sucessfully');
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  getAllSales(): Observable<ViewSale[]> {
    return this.http.get<ViewSale[]>(`${this.apiUrl!}sale`);
  }

  private getInitDateTime(): string {
    const timeZone = 'America/Sao_Paulo';
    const now = new Date();

    const zonedDate = toZonedTime(now, timeZone);
    zonedDate.setHours(0, 0, 0, 0);

    return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS", { timeZone });
  }
  private getEndDateTime(): string {
    const timeZone = 'America/Sao_Paulo';
    const now = new Date();

    const zonedDate = toZonedTime(now, timeZone);
    zonedDate.setHours(23, 59, 0, 0);

    return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS", { timeZone });
  }

  getAllSalesByToday(): Observable<ViewSale[]> {

    const json = {
      startDate: this.getInitDateTime(),
      endDate: this.getEndDateTime()
    };

    return this.http.post<ViewSale[]>(`${this.apiUrl}/search`, json);
  }



  saveSale(sale: CreateSale):Observable<any> {
    return this.http.post<any>(`${this.apiUrl!}sale`, sale)
  }

}
