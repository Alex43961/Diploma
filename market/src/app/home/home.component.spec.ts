import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { ProductsDataService } from '../products-data.service';
import { ItemService } from '../item.service';
import { CartService } from '../cart.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    const productsDataServiceSpy = jasmine.createSpyObj('ProductsDataService', [
      'getProductsList',
    ]);
    const itemServiceSpy = jasmine.createSpyObj('ItemService', ['someMethod']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'getItemsCount',
    ]);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ProductsDataService, useValue: productsDataServiceSpy },
        { provide: ItemService, useValue: itemServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Закомментируем остальные тесты до полной настройки
  // describe('ngOnInit', () => {
  //   it('should load products on initialization', () => {
  //     // Тест будет добавлен позже
  //   });
  // });
});
