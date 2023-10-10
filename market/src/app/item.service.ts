import { Injectable } from '@angular/core';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  product: Products[] = [];

  constructor() { }

  setProduct(item: Products) {
    this.product.push(item);
  }
  getProduct() {
    return this.product;
  }
}
