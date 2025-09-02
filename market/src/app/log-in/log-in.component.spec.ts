import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { LogInComponent } from './log-in.component';
import { UserService } from '../user.service';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUsersList',
      'getUser',
    ]);

    // Настраиваем моки для возврата Observable
    userServiceSpy.getUsersList.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [LogInComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    });
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Закомментируем остальные тесты до полной настройки
  // describe('login functionality', () => {
  //   it('should handle form submission', () => {
  //     // Тест будет добавлен позже
  //   });
  // });
});
