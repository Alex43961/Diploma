import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];

  constructor() { }


  addToCart(item: any): void {
    const saveCart = this.getItems("cartList");
    item.quantity = 1;
    const existingItem = this.items.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
      localStorage.setItem("cartList", JSON.stringify(this.items));
    } else {
      this.items.push({ ...item, quantity: 1 });
      localStorage.setItem("cartList", JSON.stringify(this.items));
    }
    console.log(this.items);
  }

  getItems(key: string) {
    const cartList = localStorage.getItem(key);
    if (cartList) {
      this.items = JSON.parse(cartList);
    }
    return this.items;
  }

  clearCart(): void {
    this.items = [];
    localStorage.removeItem("cartList");
  }

  getItemsCount(): number {
    let initialValue = 0;
    this.getItems("cartList");
    let sum = this.items.length;
    return sum;
  }

  getTotalPrice(items: any[]) {
    for (let item of items) {
      item.totalPrice = item.quantity * item.price;
    }
  }

  updateStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }


 
}
