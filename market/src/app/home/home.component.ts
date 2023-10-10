import { Component } from '@angular/core';
import { ProductsDataService } from '../products-data.service';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductsDataService]
})

export class HomeComponent {
  currentPage: number = 1;
  elementsOnThePage: number = 5;
  filter: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private productsDataService: ProductsDataService,
    public itemService: ItemService,
    private cartService: CartService,
    public router: Router) { }

  ngOnInit(): void {
    let productStorage: any[] = [];
    this.productsDataService.getProductsList().subscribe(data => {
      console.log('data', data)
      this.products = data;
      let storedData = localStorage.getItem('productList');
      if (storedData) {
        productStorage = JSON.parse(storedData);
      }
      this.products.push(...productStorage);
    }, error => { console.log('errorL', error) });
  }

  goItem(product: any) {
    this.itemService.setProduct(product);

    this.router.navigate(['product']);

  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.elementsOnThePage;
  }

  get endIndex(): number {
    return this.startIndex + this.elementsOnThePage;
  }


  get showedProducts(): any[] {
    this.filteredProducts = this.products.filter(product =>
      product.name?.toLowerCase().includes(this.filter.toLowerCase())
    );
    return this.filteredProducts.slice(this.startIndex, this.endIndex);
  }

  goToAdminPage() {
    this.router.navigate(['admin-page']);
  }

  goToCart() {
    this.router.navigate(['cart']);
  }

  getCartItemCount(): number {
    return this.cartService.getItemsCount();
  }

}