import { Order } from 'shared/models/order';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges().pipe(map(data => {
      return data.map(action => ({ $key: action.payload.key, ...action.payload.val() as {} }));
    }));
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref =>
    ref.orderByChild('userId').equalTo(userId));
  }

}
