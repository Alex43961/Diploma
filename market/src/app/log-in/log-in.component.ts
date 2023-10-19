import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from 'user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  registerData: User = new User();
  usersList: User[] = [];
  error: string = '';
  currentUser:any;




  constructor(public router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsersList().subscribe(
      (users: User[]) => {
        this.usersList = users;
        console.log("this.usersList", this.usersList)
      },
      (error) => {
        console.error('Ошибка при загрузке товаров', error);
      }
    );
  }

  logIn() {

    const user = this.findUser();
    if (user && user.password === this.registerData.password) {
      console.log('Авторизация успешна') 
      this.currentUser = user;
      console.log("this.currentUser",this.currentUser);
      // Действия, которые нужно выполнить при успешной авторизации
    } else {
      // Создаем новый класс для сообщения об ошибке
      this.error = 'Неверный email или пароль';
    }
  }

  goHomePage() {
    this.router.navigate(['']);
  }

  findUser() {
    return this.usersList.find(user => user.email === this.registerData.email);
  
  }
}
