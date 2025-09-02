import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsDataService } from './products-data.service';

describe('ProductsDataService', () => {
  let service: ProductsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsDataService],
    });
    service = TestBed.inject(ProductsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Закомментируем остальные тесты до полной настройки
  // describe('getProductsList', () => {
  //   it('should return products list', () => {
  //     // Тест будет добавлен позже
  //   });
  // });
});
