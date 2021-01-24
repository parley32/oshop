import { Product } from 'src/app/models/products';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product') product: Product;
@Input('show-actions') showActions = true;
  constructor() { }

}
