import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Item from '../interface/Item';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import CreateItem from '../interface/CreateItem';


@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private apiUrl: string | undefined

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl
    }

    getAll(): Observable<Item[]> {
        return this.http.get<Item[]>(this.apiUrl! + 'item');
    }
    save(item:CreateItem):Observable<Item[]>{
        return this.http.post<Item[]>(`${this.apiUrl}item`,item);
    }
    delete(id:number):Observable<any>{
        return this.http.delete(`${this.apiUrl}item/${id}`);
    }

}
