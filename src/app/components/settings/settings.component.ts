import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Users } from 'src/app/models/user/users';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  //Classe pour changer le thème de l'application pour l'utilisateur courant
  //La partie non commentée sont identique à une partie commentée dans la classe Main 

  users: Users;
  user = { id: 0, name: "", password: "", retypedPassword: "", email: "", theme: "" };

  constructor(private $ser: DataService) { }

  ngOnInit(): void {
    this.users = new Users();
    this.$ser.getAllUsers().subscribe(((users) => {
      this.users.tabUsers = (users || []).map(item => new User(item))
      this.user.id = this.users.getUserByEmail(this.getCurrentUser()).id;
      this.user.name = this.users.getUserByEmail(this.getCurrentUser()).name;
      this.user.password = this.users.getUserByEmail(this.getCurrentUser()).password;
      this.user.email = this.users.getUserByEmail(this.getCurrentUser()).mail;
      this.user.theme = this.users.getUserByEmail(this.getCurrentUser()).theme;
    }));
  }

  //Changé le thème
  changeTheme(theme: string) {
    this.$ser.setTheme(theme);
    this.user.theme = theme;
    var u = new User(this.user.id, this.user.name, this.user.email,
      this.user.password, this.user.theme);
    this.$ser.updateUser(u.jsonFormat()).subscribe();
    localStorage.setItem('user', JSON.stringify({ login: u.mail }));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')).login;
  }

}
