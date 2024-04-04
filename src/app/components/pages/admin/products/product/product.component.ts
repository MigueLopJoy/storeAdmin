import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Product } from '../../../../../core/models/product';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../../../../../core/pipes/currency.pipe';
import { TruncateTextPipe } from '../../../../../core/pipes/truncate-text.pipe';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardModule, RatingModule, FormsModule, CurrencyPipe, TruncateTextPipe, ButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {
  @Input() product!: Product;

  displayEditDialog: boolean = false;
  @Output() displayEditDialogChange = new EventEmitter<Product>();

  displayEditPopup() {
    this.displayEditDialog = true;
    this.displayEditDialogChange.emit(this.product);
  }
}
