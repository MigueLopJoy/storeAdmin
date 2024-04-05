import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../../core/models/product';

@Component({
  selector: 'app-product-popup',
  standalone: true,
  imports: [DialogModule, InputGroupModule, InputTextModule, RatingModule, ButtonModule, ReactiveFormsModule, InputNumberModule],
  templateUrl: './product-popup.component.html',
  styleUrl: './product-popup.component.scss'
})
export class ProductPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() header!: string;
  @Input() display: boolean = false;
  @Input() selectedProduct!: Product;

  @Output() displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<Product>();

  
  productForm = this.formBuilder.group({
    name: '',
    price: 0,
    image: '',
    rating: 0
  })

  closeDialog() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  ngOnChanges() {
    this.productForm.patchValue(this.selectedProduct);
  }

  onConfirm() {
    const { name, price, image, rating} = this.productForm.value;

    this.confirm.emit({
      name: name || '',
      price: price || 0,
      image: image || '',
      rating: rating || 0
    });
  }

  onCancel() {
    this.closeDialog()
  }

  onDisplayChange() {
    this.displayChange.emit(this.display);
  }
}
