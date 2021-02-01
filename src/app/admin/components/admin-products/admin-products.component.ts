import { Product } from 'shared/models/products';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription;
  rows: Product[] = [];

  constructor(private productService: ProductService) { 

    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.rows = this.products;
      });
  }

  filter(query: string) {

    let filteredProducts = this.products.filter(product => {
      return product.title.toLowerCase().includes(query.toLowerCase());
    });
    this.rows = filteredProducts;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
