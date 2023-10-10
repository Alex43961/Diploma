import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Products } from '../products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];
  selectedCurrency: string = '$';
  totalPrice: number = 0;

  constructor
    (private cartService: CartService,
      public router: Router) {
    this.cartItems = this.cartService.getItems("cartList");
  }

  ngOnInit() {
    this.cartService.getTotalPrice(this.cartItems);
  }

  removeItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    this.cartService.updateStorage("cartList", this.cartItems);
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    item.totalPrice = item.quantity * item.price;
    this.cartService.updateStorage("cartList", this.cartItems);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      item.totalPrice = item.quantity * item.price;
    }
    this.cartService.updateStorage("cartList", this.cartItems);
  }



  calculateTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  }

  checkout(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  getCartItemCount(): number {
    return this.cartService.getItemsCount();
  }

  goBack() {
    this.router.navigate(['']);
  }
}

