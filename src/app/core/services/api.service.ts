import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Options } from '../models/options';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url) as Observable<T>;
  }

  post<T>(url: string, body: Product): Observable<T> {
    return this.httpClient.post<T>(url, body);
  }

  put<T>(url: string, body: Product): Observable<T> {
    return this.httpClient.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url);
  }
}
