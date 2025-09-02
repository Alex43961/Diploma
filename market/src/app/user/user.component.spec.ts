import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { UserService } from '../user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getCurrentUser',
      'updateUser',
      'getUsersList',
    ]);

    // Настраиваем моки для возврата Observable
    userServiceSpy.getUsersList.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Закомментируем остальные тесты до полной настройки
  // describe('user functionality', () => {
  //   it('should display user information', () => {
  //     // Тест будет добавлен позже
  //   });
  // });
});
