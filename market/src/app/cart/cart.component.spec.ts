import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'getItems',
      'getItemsCount',
      'getTotalPrice',
    ]);
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getCurrentUser',
    ]);

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Закомментируем остальные тесты до полной настройки
  // describe('cart functionality', () => {
  //   it('should display cart items', () => {
  //     // Тест будет добавлен позже
  //   });
  // });
});
