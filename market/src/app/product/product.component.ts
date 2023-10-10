import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { HomeComponent } from '../home/home.component';
import { ProductsDataService } from '../products-data.service';
import { CartService } from '../cart.service';
import { CommentsService } from '../comments.service';
import { Comment } from '../comments';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {
  product: any;
  commentsList: any = { name: '', comments: [] };

  myComments: any[] = [];
  newCommentText: string = '';
  savedComments = this.commentsService.getItem('commentsList');

  constructor(private productsDataService: ProductsDataService,
    public itemService: ItemService,
    private cartService: CartService,
    public router: Router,
    private commentsService: CommentsService
  ) { }

  goBack() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    const items = this.itemService.getProduct();
    this.product = items[items.length - 1];
    this.loadComments();
  }

  loadComments(): void {
    console.log("savedComments", this.savedComments);
    if (this.savedComments) {
      function findObjectByName(arr: any[], nameToFind: string): any | undefined {
        return arr.find(obj => obj.name === nameToFind);
      }
      const foundObject = findObjectByName(this.savedComments, this.product.name);
      if (foundObject) {
        this.commentsList = foundObject;
        console.log('Найден объект:', foundObject);
      }
    }    
  }

  addToCart(item: any): void {
    this.cartService.addToCart(item);

  }

  addComment(newComment: string): void {
    if (this.savedComments) {
      this.myComments = this.savedComments;
      function findObjectByName(arr: any[], nameToFind: string): any | undefined {
        return arr.find(obj => obj.name === nameToFind);
      }
      const foundObject = findObjectByName(this.myComments, this.product.name);
      if (foundObject) {        
        foundObject.comments.push(newComment.replace(/кокос|банан|плохой|\@/gi, match => '*'.repeat(match.length)));

      } else {
        this.commentsList.name = this.product.name;
        this.commentsList.comments.push(newComment.replace(/кокос|банан|плохой|\@/gi, match => '*'.repeat(match.length)));
        this.myComments.push(this.commentsList);
      }
    }
    this.commentsService.setItem('commentsList', this.myComments);
    this.newCommentText = '';
    this.loadComments();
  }
}
