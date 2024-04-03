import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  
  constructor(private productsService: ProductsService) {}

  fetchProducts() {
    console.log("BIEN 2")
    this.productsService
    .getProducts('http://localhost:3000/products')
    .subscribe(
      {
        next: (data: Product[]) => {
          return data
        },
        error: (error: Error) => {
          console.log(error)
        }
      }
    )
  }
  
  ngOnInit() {
    console.log("BIEN 1")
    console.log(this.fetchProducts());
  }
}
