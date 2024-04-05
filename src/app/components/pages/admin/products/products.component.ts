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
    this.productsService
      .editProduct(`http://localhost:3000/products/${this.selectedProduct._id}`, product)
      .subscribe(
        {
          next: (editedProduct: Product) => {
            const previousProduct: Product | undefined = this.products.find(product => product._id === editedProduct._id)
            if (previousProduct) {
              const previousProductIndex = this.products.indexOf(previousProduct)
              this.products[previousProductIndex] = editedProduct    
            }
          },
          error: (error: Error) => {
            console.log(error);
          },
        }
      )
  }

  deleteProduct(product: Product) {
    this.productsService
      .deleteProduct(`http://localhost:3000/products/${product._id}`)
      .subscribe(
        {
          next: (deletedProduct: Product) => {
            const previousProduct: Product | undefined = this.products.find(product => product._id === deletedProduct._id)
            if (previousProduct) {
              const previousProductIndex = this.products.indexOf(previousProduct)
              this.products.splice(previousProductIndex, 1)
            }
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
