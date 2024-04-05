import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Product } from '../../../../../core/models/product';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '../../../../../core/pipes/currency.pipe';
import { TruncateTextPipe } from '../../../../../core/pipes/truncate-text.pipe';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardModule, RatingModule, FormsModule, CurrencyPipe, TruncateTextPipe, ButtonModule, ConfirmPopupModule, ToastModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {

  constructor(private confirmationService: ConfirmationService) {}

  @Input() product!: Product;
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @ViewChild('deleteButton') deleteButton: any;

  displayEditPopup() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.delete.emit(this.product);
      },
    });
  }
}
