import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  fetchProducts() {
    this.productsService
    .getProducts('http://localhost:3000/products')
    .subscribe(
      {
        next: (products: Product[]) => {
          this.products = products;
        },
        error: (error: Error) => {
          console.log(error)
        }
      }
    )
  }
  
  ngOnInit() {
    this.fetchProducts();
  }
}
