import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product';
import { ProductComponent } from './product/product.component';
import { ButtonModule } from 'primeng/button';
import { ProductPopupComponent } from '../../../shared/resources/product-popup/product-popup.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, ButtonModule, ProductPopupComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  displayAddPopup: boolean = false;
  displayEditPopup: boolean = false;
  dialogHeader!: string;
  selectedProduct!: Product;

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

  addProduct(product: Product) {
    this.productsService
      .addProduct('http://localhost:3000/products', product)
      .subscribe(
        {
          next: (addedProduct: Product) => {
            this.products.push(addedProduct)
          },
          error: (error: Error) => {
            console.log(error);
          },
        }
      )
  }

  editProduct(product: Product) {
    console.log(this.selectedProduct._id)
    this.productsService
      .editProduct(`http://localhost:3000/products/${this.selectedProduct._id}`, product)
      .subscribe(
        {
          next: (editedProduct: Product) => {
            this.products[this.products.indexOf(product)] = editedProduct            
          },
          error: (error: Error) => {
            console.log(error);
          },
        }
      )
  }

  ngOnInit() {
    this.fetchProducts();
  }

  displayAddDialog() {
    this.dialogHeader = 'Add Product';
    this.displayAddPopup = true;
  }

  displayEditDialog(product: Product) {
    this.selectedProduct = product;
    this.dialogHeader = 'Edit Product';
    this.displayEditPopup = true;  
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
  }

  onConfirmEdit(product: Product) {
    this.editProduct(product);
  }
}
