import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Users } from 'src/app/models/user/users';
import { User } from 'src/app/models/user/user';
import { isNull } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //Classe pour se connecter à l'application
  //La partie non commentée sont identique à une partie commentée dans la classe Main 

  users: Users;

  user = { password: "", mail: "" };

  errorMessage: any = true; //pour afficher le message d'erreur leur de la sasie des inforamtions d'authentification


  constructor(private $ser: DataService, private $router: Router) {
    if (!isNull(localStorage.getItem('user'))) {
      $router.navigate(['../main/home']);
    }
  }

  ngOnInit(): void {
    this.users = new Users();
    this.$ser.getAllUsers().subscribe((users) => {
      this.users.tabUsers = (users || []).map(item => new User(item))
    }, error => { this.$router.navigate(['../error']) });
  }

  //pour se connecter
  login() {
    this.errorMessage = this.users.checkLoginInfos(this.user.mail, this.user.password);
    this.$ser.setTheme(this.users.getUserByEmail(this.user.mail).theme);
    localStorage.setItem('user', JSON.stringify({ login: this.user.mail }));
  }

  //pour récupérer l'erreur faite par l'utilisateur lors de la saisie de ses informations
  getError() {
    this.errorMessage = this.users.checkLoginInfos(this.user.mail, this.user.password);
  }

}
