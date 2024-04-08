import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product';
import { ProductComponent } from './product/product.component';
import { ButtonModule } from 'primeng/button';
import { ProductPopupComponent } from '../../../shared/resources/product-popup/product-popup.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { first } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, ButtonModule, ProductPopupComponent, PaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  productsToDisplay: Product[] = [];
  displayAddPopup: boolean = false;
  displayEditPopup: boolean = false;
  dialogHeader!: string;
  selectedProduct!: Product;
  page: number = 0;
  perPage: number = 4;

  fetchProducts() {
    this.productsService
      .getProducts('http://localhost:3000/products')
      .subscribe(
        {
          next: (products: Product[]) => {
            this.products = products;
            this.modifyDisplayProductsArray();
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
            this.modifyDisplayProductsArray()
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
              this.modifyDisplayProductsArray()
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
              this.modifyDisplayProductsArray()
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

  onPageChange(ps: any | undefined) {
    console.log(ps)
    if (ps) {
      this.page = ps.page
      this.perPage = ps.rows
      this.productsToDisplay = this.products.slice((ps.first), (ps.first + ps.rows)) 
    } else {
      let firstElement = ((this.page) * this.perPage)
      console.log(firstElement)
      console.log((firstElement + this.perPage))
      this.productsToDisplay = this.products.slice(firstElement, (firstElement + this.perPage))
    }
  }

  modifyDisplayProductsArray(){
    this.productsToDisplay = this.products
    this.onPageChange(undefined)
  }
}
