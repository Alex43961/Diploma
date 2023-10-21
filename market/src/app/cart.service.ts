import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any = [];
  user: any = {};
 

  constructor(private userService: UserService) { }


  addToCart(item: any): void {
    this.user = this.userService.getCurrentUser();
    const productToCart: any = {
    _id:item._id,
    image:item.image,
    name: item.name,
    price: item.price,
    quantity: item.quantity
  }
    
    const saveCart = this.user.cart;
    const existingItem = this.user.cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      existingItem.quantity += 1;
        this.userService.updateUser(this.user).subscribe(() => {

          console.log('Количество добавлено:', this.user.cart);
        });
        } else {
         this.user.cart.push(productToCart) ;
         console.log("this.user",this.user)
         this.userService.updateUser(this.user).subscribe(() => {

          console.log('Товар в корзину добавлен:', this.user.cart);
        });
        }

      // const saveCart = this.getItems("cartList");
      // item.quantity = 1;
      // const existingItem = this.items.find((cartItem) => cartItem.name === item.name);
      // if (existingItem) {
      //   existingItem.quantity += 1;
      //   localStorage.setItem("cartList", JSON.stringify(this.items));
      // } else {
      //   this.items.push({ ...item, quantity: 1 });
      //   localStorage.setItem("cartList", JSON.stringify(this.items));
      // }
      // console.log(this.items);
    }

    getItems() {
      let currentUser = this.userService.getCurrentUser();
      
      // const cartList = localStorage.getItem(key);
      // if (cartList) {
      //   this.items = JSON.parse(cartList);
      // }
       return currentUser.cart;
    }

    clearCart(): void {
      this.items = [];
      localStorage.removeItem("cartList");
    }

    getItemsCount(): number {
      let initialValue = 0;
      let currentUser = this.userService.getCurrentUser();
     if(currentUser&& currentUser!== undefined){
      let sum = currentUser.cart.length;
     
      return sum;
     }else {
      return initialValue;
     }
        //  this.getItems('cartList');
      // this.getItems();
      
      
      
      
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
