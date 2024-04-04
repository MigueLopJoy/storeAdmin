import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product';
import { ProductComponent } from './product/product.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
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
