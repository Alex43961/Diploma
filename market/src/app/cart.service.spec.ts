import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { UserService } from './user.service';

describe('CartService', () => {
  let service: CartService;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getCurrentUser',
      'updateUser',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CartService,
        { provide: UserService, useValue: userServiceSpy },
      ],
    });

    service = TestBed.inject(CartService);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Закомментируем остальные тесты до полной настройки
  // describe('addToCart', () => {
  //   it('should add new item to cart when item does not exist', () => {
  //     // Тест будет добавлен позже
  //   });
  // });
});
