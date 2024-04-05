import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  post<T>(url: string, body: Product): Observable<T> {
    return this.httpClient.post<T>(url, body);
  }

  put<T>(url: string, body: Product): Observable<T> {
    console.log("SEGUIMOS")
    return this.httpClient.put<T>(url, body);
  }
}
