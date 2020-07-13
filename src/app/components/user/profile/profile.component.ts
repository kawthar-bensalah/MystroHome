import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Users } from 'src/app/models/user/users';
import { User } from 'src/app/models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //Classe pour modifier le compte de l'utilisateur connecté
  //La partie non commentée sont identique à une partie commentée dans la classe Main 

  users: Users;
  user = { id: 0, name: "", password: "", retypedPassword: "", email: "", theme: "" };

  set = { name: false, password: false };

  theme: any;

  constructor(private $ser: DataService, private $router: Router) { }

  ngOnInit(): void {
    this.theme = this.$ser.theme;

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

  //modifier le nom de l'utilisateur connecté
  setName() {
    this.set.name = true;
  }

  //valider la modification de nom
  validateName() {
    this.set.name = false;
    var u = new User(this.user.id, this.user.name, this.user.email,
      this.user.password);
    this.$ser.updateUser(u.jsonFormat()).subscribe();
    localStorage.setItem('user', JSON.stringify({ login: u.mail }));
    location.reload();
  }

  //Annuler la modification de nom
  cancelName() {
    this.set.name = false;
  }

  //Modifier le mot de passe de l'utilisateur connecté
  setPassword() {
    this.set.password = true;
  }

  //valider la modification de mot de passe
  validatePassword() {
    this.set.password = false;
    var u = new User(this.user.id, this.user.name, this.user.email,
      this.user.password, this.user.theme);
    this.$ser.updateUser(u.jsonFormat()).subscribe();
    localStorage.setItem('user', JSON.stringify({ login: u.mail }));
    location.reload();
  }

  //Annuler la modification de mot de passe
  cancelPassword() {
    this.set.password = false;
  }

  //Rendre le mot de passe invisible pour l'utilisateur
  passwordInvisible() {
    var passInvisible = "";
    for (var i = 0; i < this.user.password.length; i++)
      passInvisible += "•";
    return passInvisible;
  }

  //Récupérer l'utilisateur courant
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')).login;
  }

  //Supprimer le compte de l'utilisateur connecté
  deleteAccount() {
    this.$ser.deleteUser(this.user.id).subscribe();
    this.$ser.deleteProcessByOwner(this.user.id).subscribe();
    this.$ser.deleteMessageBySender(this.user.id).subscribe();
    this.$ser.deleteMessageByReceiver(this.user.id).subscribe();
    localStorage.removeItem('user');
    this.$router.navigate(['']);
  }

}
