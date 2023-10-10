import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  private commentsListKey = 'commentsList';



  getItem(key: string): any {
    const itemList = localStorage.getItem(key);
    if(itemList){
      return JSON.parse( itemList);
    }    
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

