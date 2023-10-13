import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  product: any = {};
  // commentsList: any = { name: '', comments: [] };

  myComments: any[] = [];
  newCommentText: string = '';
  // savedComments = this.commentsService.getItem('commentsList');
  isSavedComments:boolean = false;

  constructor(
    private productsDataService: ProductsDataService,
    public itemService: ItemService,
    private cartService: CartService,
    public router: Router,
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) { }

  goBack() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    // const items = this.itemService.getProduct();
    // this.product = items[items.length - 1];
    // this.loadComments();

this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId !== null) {
        const parsedProductId = productId;
        this.productsDataService.getProduct(parsedProductId).subscribe(product => {
          this.product = product;
          console.log(this.product);
          // if (this.product && !this.isSavedComments) {
            // Загрузите комментарии при загрузке страницы
             this.loadComments();
            this.isSavedComments = true;
          // }
        });
      }      
    });

    // this.route.data.subscribe(data => {
    //   this.selectedCurrencySymbol = data['currency'];
    // });
  }

  loadComments(): void {
    // console.log("savedComments", this.savedComments);
    // if (this.savedComments) {
    //   function findObjectByName(arr: any[], nameToFind: string): any | undefined {
    //     return arr.find(obj => obj.name === nameToFind);
    //   }
    //   const foundObject = findObjectByName(this.savedComments, this.product.name);
    //   if (foundObject) {
    //     this.commentsList = foundObject;
    //     console.log('Найден объект:', foundObject);
    //   }
    // }    
     if (this.product && this.product._id) {
      this.productsDataService.getComments(this.product._id).subscribe((comments: string[]) => {
        this.myComments = comments;
        console.log('Загруженные комментарии из базы данных:', this.myComments);
      });
    }
    this.isSavedComments = true;
  }

  addToCart(item: any): void {
    this.cartService.addToCart(item);

  }

  addComment(newComment: string): void {
    // if (this.savedComments) {
    //   this.myComments = this.savedComments;
    //   function findObjectByName(arr: any[], nameToFind: string): any | undefined {
    //     return arr.find(obj => obj.name === nameToFind);
    //   }
    //   const foundObject = findObjectByName(this.myComments, this.product.name);
    //   if (foundObject) {        
    //     foundObject.comments.push(newComment.replace(/кокос|банан|плохой|\@/gi, match => '*'.repeat(match.length)));

    //   } else {
    //     this.commentsList.name = this.product.name;
    //     this.commentsList.comments.push(newComment.replace(/кокос|банан|плохой|\@/gi, match => '*'.repeat(match.length)));
    //     this.myComments.push(this.commentsList);
    //   }
    // }
    // this.commentsService.setItem('commentsList', this.myComments);
    if (this.newCommentText.trim() !== '') {
      
      if (this.product) {
        if (!this.product.comments) {
          this.product.comments = [];
        }
        this.product.comments.push(this.newCommentText.replace(/кокос|банан|плохой|\@/gi, match => '*'.repeat(match.length)))

        // Обновление комментариев внутри клиентского кода сразу же
        // this.myComments = this.product.comments.slice();

        // Отправить комментарий на сервер для сохранения
        this.productsDataService.updateProduct(this.product).subscribe(() => {

          console.log('Комментарии внутри this.product после добавления:', this.product.comments);
        });
      }
      this.newCommentText = '';
    this.loadComments();
    }
    
  }
}
