import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: any;
  private currentProduct:any;
  PORT = 'http://localhost:3000';


  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentProduct(product){
    this.currentProduct = product;
    console.log("[currentProduct]",this.currentProduct);
  }

  getCurrentProduct(){
    return this.currentProduct;
  }


  constructor(private http: HttpClient) { }
  // !-------------------------------------------
  getUsersList(): Observable<any> {
    return this.http.get<any>(`${this.PORT}/users`);
  }

  getUser(userEmail: string): Observable<any> {
    return this.http.get<any>(`${this.PORT}/users/${userEmail}`);
  }

  addUser(user: any): Observable<any> {
    console.log("serv user", user)
    return this.http.post<any>(`${this.PORT}/users`, user);
  }


  // deleteProduct(productId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.PORT}/products/${productId}`);
  // }



  updateUser(updatedUser: any): Observable<any> {
    return this.http.put<any>(`${this.PORT}/users/${updatedUser._id}`, updatedUser);
  }


  saveCart(userId: string, cart: string): Observable<any> {
     const body = { cart }; 
    return this.http.post<any>(`${this.PORT}/products/${userId}/add-cart`, body);
   }


  //   getComments(productId: string): Observable<string[]> {
  //     return this.http.get<string[]>(`${this.PORT}/products/${productId}`);
  // }
}
