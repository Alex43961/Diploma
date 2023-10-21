import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from 'user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  registerData: User = new User();
  usersList: User[] = [];
  isModalWindow: boolean = false;
  currentUser: any;



  constructor(public router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsersList().subscribe(
      (users: User[]) => {
        this.usersList = users;
        console.log("this.usersList", this.usersList)

        const user = this.findUser();

        this.currentUser = user;
        this.userService.setCurrentUser(user);
        console.log("this.currentUser", this.currentUser);
      },
      (error) => {
        console.error('Ошибка при загрузке товаров', error);
      }
    );
  }

  register() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    } else {
      const findUser = this.usersList.find(user => user.email === this.registerData.email);
      if (findUser) {
        this.isModalWindow = true;
      } else {
        const emailParts = this.registerData.email.split("@");
        const emailDomen = emailParts[0];
        console.log("emailDomen", emailDomen);
        const newUser = { userName: emailDomen, email: this.registerData.email, password: this.registerData.password }
        this.userService.addUser(newUser).subscribe(
          () => {
            this.ngOnInit(); // Обновить список товаров после успешного добавления


            console.log("newUser", newUser);
            this.goHomePage();
          },
          (error) => {
            console.error('Ошибка при добавлении пользователя', error);
          }
        );
      }

    }



    // Реализуйте здесь код для отправки данных регистрации на сервер
    console.log('Регистрация:', this.registerData);
  }

  findUser() {
    return this.usersList.find(user => user.email === this.registerData.email);

  }

  hideModalWindow() {
    this.isModalWindow = false;
  }

  goHomePage() {
    this.router.navigate(['']);
  }

}
