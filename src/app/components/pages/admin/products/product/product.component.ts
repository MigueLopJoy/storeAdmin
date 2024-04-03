import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Product } from '../../../../../core/models/product';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardModule, RatingModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
}
