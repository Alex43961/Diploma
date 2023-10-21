import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsDataService } from '../products-data.service';
import { Products } from '../products';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent {
  productForm: FormGroup;
  productList: any[] = [];
  imageLoadingFailed: boolean = false;
  productStorage: any[] = [];
  isLoggedIn: boolean = false;
  password: string = "";
  passwordInvalid: boolean = false;
  isModalWindow: boolean = false;
  selectIndex: number = -1;

  constructor(
    private productsDataService: ProductsDataService,
    private fb: FormBuilder,
    public router: Router) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern('[A-zА-я ]+')]],
      productDescription: ['', [Validators.required, Validators.pattern('[A-Za-zА-Яа-я0-9 ]+')]],
      productImage: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  checkPassword() {
    if (this.password === 'admin') {
      this.isLoggedIn = true;
    } else {
      this.passwordInvalid = true;
    }
  }


  ngOnInit() {
    // const storedProducts = localStorage.getItem('productList');
    // this.productList = storedProducts ? JSON.parse(storedProducts) : [];
    this.productsDataService.getProductsList().subscribe(
     (products: Products[]) => {
        this.productStorage = products;
      },
      (error) => {
        console.error('Ошибка при загрузке товаров', error);
      }
    );
  }

  addProduct() {
    if (this.productForm.valid) {
      const addedProduct: Products = {
        image: this.productForm.value.productImage,
        name: this.productForm.value.productName,
        price: +this.productForm.value.productPrice,
        description: this.productForm.value.productDescription,
        quantity:1
      };
      

      // this.productStorage.push(...this.productList);
      // localStorage.setItem('productList', JSON.stringify(this.productStorage));
      // this.productForm.reset();
      this.productsDataService.addProduct(addedProduct).subscribe(
        () => {
          this.ngOnInit(); // Обновить список товаров после успешного добавления
          this.productForm.reset(); // Сбросить форму
          // Очистите поля формы
          // this.productName = '';
          // this.productPrice;
          // this.productImageUrl = '';
          // this.productDescription = '';
        },
        (error) => {
          console.error('Ошибка при добавлении товара', error);
        }
      );
    }
  }

  checkImage() {
    const image = new Image();
    image.src = this.productForm.value.productImage;
    image.onload = () => {
      this.imageLoadingFailed = false;
    };
    image.onerror = () => {
      this.imageLoadingFailed = true;
    };
  }

  showModalWindow(i) {
    this.selectIndex = i;
    this.isModalWindow = true;
  }

  hideModalWindow() {
    this.isModalWindow = false;
  }

  deleteProduct():void {
   const x =  this.productStorage.splice(this.selectIndex, 1);
    const index = x[0]._id;

    
    
    if (index) {
      this.productsDataService.deleteProduct(index).subscribe(() => {
        this.productStorage = this.productStorage.filter(p => p._id !== index);

      });
    }
    // this.productList.splice(this.selectIndex, 1);
    // localStorage.setItem('productList', JSON.stringify(this.productList));
    this.hideModalWindow();

  }

  goBack() {
    this.router.navigate(['']);
  }
}
