import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { DataService } from 'src/app/services/data.service';
import { Users } from 'src/app/models/user/users';
import { Router } from '@angular/router';
import { isNull } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //Classe pour créer un nouveau compte utilisateur
  //La partie non commentée sont identique à une partie commentée dans la classe Main 

  users: Users;

  user = { id: 0, name: "", password: "", retypedPassword: "", email: "" };

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

  //Ajouter un nouvel utilisateur dans la base de données
  addUser() {
    var u = new User(this.user.id, this.user.name, this.user.email,
      this.user.password, "Theme1");
    this.$ser.saveUser(u.jsonFormat()).subscribe();
    localStorage.setItem('user', JSON.stringify({ login: u.mail }));
    location.replace("../main/home");
  }

}
