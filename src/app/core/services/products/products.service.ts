import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  getProducts(url: string): Observable<Product[]> {
    return this.apiService.get(url);
  }

  addProduct(url: string, body: Product): Observable<Product> {
    return this.apiService.post(url, body);
  }

  editProduct(url: string, body: Product): Observable<Product>  {
    console.log("ESTAMOS")
    return this.apiService.put(url, body);
  }
}
