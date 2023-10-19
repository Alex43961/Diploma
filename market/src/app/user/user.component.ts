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
 usersList:User [] = [];
 


 constructor( public router: Router,
    private route: ActivatedRoute,
    private userService: UserService){}

    ngOnInit() {
       this.userService.getUsersList().subscribe(
     (users: User[]) => {
        this.usersList = users;
        console.log("this.usersList",this.usersList)
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
      const emailParts = this.registerData.email.split("@");
      const emailDomen = emailParts[0];
      console.log("emailDomen",emailDomen);
      const newUser = {userName:emailDomen, email:this.registerData.email, password:this.registerData.password}
this.userService.addUser(newUser).subscribe(
        () => {
          this.ngOnInit(); // Обновить список товаров после успешного добавления
          console.log("newUser",newUser);
          this.goHomePage();
        },
        (error) => {
          console.error('Ошибка при добавлении товара', error);
        }
      );
    }

   

    // Реализуйте здесь код для отправки данных регистрации на сервер
    console.log('Регистрация:', this.registerData);
  }
//  addUser(){
 
//     }

    goHomePage() {
    this.router.navigate(['']);
  }

}
