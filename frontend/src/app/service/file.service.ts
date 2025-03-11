import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { environment } from "../environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private TOKEN = 'authToken';
    private API_URL = environment.apiUrl + 'files';
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http:HttpClient) { }

    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.TOKEN); // Só executa no navegador
        }
        return null;
    }

    upload(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        const token = this.getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
        return this.http.post<any>(`${this.API_URL}/upload`, formData, { headers });
    }
}