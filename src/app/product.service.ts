import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
      .pipe(map(data => {
        return data.map(action => {
          const $key = action.payload.key;
          const data = { $key, ...action.payload.val() as {}};
          return data;
        });
      }));
    }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }
}
