import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AdminPageComponent } from './admin-page.component';
import { ProductsDataService } from '../products-data.service';
import { UserService } from '../user.service';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(() => {
    const productsDataServiceSpy = jasmine.createSpyObj('ProductsDataService', [
      'getProductsList',
      'addProduct',
      'updateProduct',
      'deleteProduct',
    ]);
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUsersList',
    ]);

    // Настраиваем моки для возврата Observable
    productsDataServiceSpy.getProductsList.and.returnValue(of([]));
    userServiceSpy.getUsersList.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        { provide: ProductsDataService, useValue: productsDataServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Закомментируем остальные тесты до полной настройки
  // describe('admin functionality', () => {
  //   it('should manage products', () => {
  //     // Тест будет добавлен позже
  //   });
  // });
});
