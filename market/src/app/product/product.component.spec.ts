import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { ProductsDataService } from '../products-data.service';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    const productsDataServiceSpy = jasmine.createSpyObj('ProductsDataService', [
      'getProduct',
    ]);
    const itemServiceSpy = jasmine.createSpyObj('ItemService', ['someMethod']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ProductsDataService, useValue: productsDataServiceSpy },
        { provide: ItemService, useValue: itemServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Закомментируем остальные тесты до полной настройки
  // describe('product functionality', () => {
  //   it('should display product details', () => {
  //     // Тест будет добавлен позже
  //   });
  // });
});
