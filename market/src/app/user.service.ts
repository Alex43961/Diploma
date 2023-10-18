import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PORT = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
   // !-------------------------------------------
    getUsersList(): Observable<any> {
    return this.http.get<any>(`${this.PORT}/users`);
  }

  // getProduct(productId: string): Observable<any> {
  //   return this.http.get<any>(`${this.PORT}/products/${productId}`);
  // }

  addUser(user: any): Observable<any> {
    console.log("serv user",user)
    return this.http.post<any>(`${this.PORT}/users`, user);
  }

 
  // deleteProduct(productId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.PORT}/products/${productId}`);
  // }


 
  // updateProduct(updatedProduct: any): Observable<any> {
  //   return this.http.put<any>(`${this.PORT}/products/${updatedProduct._id}`, updatedProduct);
  // }

  
  // saveComment(productId: string, comment: string): Observable<any> {
  //   const body = { comment }; 
  //   return this.http.post<any>(`${this.PORT}/products/${productId}/add-comment`, body);
  // }

   
  //   getComments(productId: string): Observable<string[]> {
  //     return this.http.get<string[]>(`${this.PORT}/products/${productId}`);
  // }
}
