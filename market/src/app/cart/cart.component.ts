import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Products } from '../products';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];
  selectedCurrency: string = '$';
  totalPrice: number = 0;
  currentUser:any;

  constructor
    (private cartService: CartService,
      public router: Router,
      private userService:UserService) {
     
     this.currentUser  = userService.getCurrentUser();
  }

  ngOnInit() {
    if(this.currentUser){
      this.cartItems = this.cartService.getItems();
    }
    this.cartService.getTotalPrice(this.cartItems);
  }

  removeItem(item: any): void {
    const index = this.currentUser.cart.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    // this.cartService.updateStorage("cartList", this.cartItems);
    this.userService.updateUser(this.currentUser).subscribe(() => {

          console.log('Продукт'+`${item.name}`+"удален", this.currentUser.cart);
        });
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    item.totalPrice = item.quantity * item.price;
    // this.cartService.updateStorage("cartList", this.cartItems);
     this.userService.updateUser(this.currentUser).subscribe(() => {

          console.log('Количество добавлено:', this.currentUser.cart);
        });
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      item.totalPrice = item.quantity * item.price;
    }
    // this.cartService.updateStorage("cartList", this.cartItems);
    this.userService.updateUser(this.currentUser).subscribe(() => {

          console.log('Количество убавлено:', this.currentUser.cart);
        });
  }



  calculateTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price * item.quantity;
    }
    return total;
  }

  checkout(): void {
    this.currentUser.cart = [];
    this.userService.updateUser(this.currentUser).subscribe(() => {

          console.log('Корзина очищена', this.currentUser.cart);
        });
    // this.cartService.clearCart();
     this.cartItems = [];
  }

  getCartItemCount(): number {
    return this.cartService.getItemsCount();
  }

  goBack() {
    this.router.navigate(['']);
  }
}

