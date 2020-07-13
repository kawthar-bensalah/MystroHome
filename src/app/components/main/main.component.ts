import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user/user';
import { Users } from 'src/app/models/user/users';
import { Messages } from 'src/app/models/message/Messages';
import { Message } from 'src/app/models/message/Message';
import { OneObject } from 'src/app/models/objects/Object';
import { objects } from 'src/app/models/objects/objects';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { Notifications } from 'src/app/models/notifications/notifications';
import { notification } from 'src/app/models/notifications/notification';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  //La classe principale

  users: Users; //objet pour récupérer les utilisateurs
  tabMessages: Messages; //objet pour récupérer tous les messages reçus par l'utilisateur connecté
  tab: any = new Array<any>(); //tableau de tous les messages reçus par l'utilisateur connecté
  notifications: Notifications; //objet pour récupérer les notifications de la base de données

  theme: any; //attribut pour réupérer le thème de l'utilisateur connecté

  newNotifications: number = 0; //attribut pour compter le nombre de nouvelles notifications

  constructor(private $ser: DataService, private router: Router) { }

  //se déclanche au chargement du composant
  async ngOnInit() { //asynchrone
    this.users = new Users();

    //récupérer le utilisateurs existants dans la base de données et les mettre dans l'objet "users"
    this.$ser.getAllUsers().subscribe((users) => {
      this.users.tabUsers = (users || []).map(item => new User(item))

      if (!this.users.getUserByEmail(this.getCurrentUser())) { //si l'utilisateur connecté est supprimé de la base de données
        this.logOut(); //se déconnecter
      }

      //récupérer les messages, les scénarios et le thème et les mettre dans leurs attributs
      this.tabMessages = new Messages();
      this.$ser.getAllMessages(this.users.getUserByEmail(this.getCurrentUser()).id).subscribe(((tabMessages) => {
        this.tabMessages.tabMessages = (tabMessages || []).map(item => new Message(item))
        this.tab = this.tabMessages.tabMessages;
        this.$ser.setTheme(this.users.getUserByEmail(this.getCurrentUser()).theme);
        this.theme = this.$ser.theme;
      }));
      //Erreurs de connexion à la base de données et de récupération des informations
    }, err => {
      this.logOut();
    });

    //récupérer les notifications et les mettre dans l'attribut "notifications"
    this.notifications = new Notifications();
    this.$ser.getAllNotifications().subscribe(((notifications) => {
      this.notifications.tabNotifications = (notifications || []).map(item => new notification(item))
    }));


    //mettre à jour les notifications
    var oldObjects = new objects();
    oldObjects = await this.$ser.getAllObjectsDescription();

    //vérifier chaque 100ms si y a un changement dans les objets ou leurs descriptions
    interval(100).subscribe(async s => {
      var newObjects = await this.$ser.getAllObjectsDescription();
      if (newObjects.isUpdated(oldObjects.tabObjects) != false) {
        for (var [key, value] of newObjects.isUpdated(oldObjects.tabObjects) as Map<OneObject, string>) {
          this.newNotifications++;
          this.notifications = new Notifications();
          this.$ser.getAllNotifications().subscribe(((notifications) => {
            this.notifications.tabNotifications = (notifications || []).map(item => new notification(item))
          }));
        }
        oldObjects = newObjects;
      }
    });

  }

  //Se déconnecter
  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  //Récupérer l'utilisateur courant
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')).login;
  }

  //Supprimer toutes les notifications
  deleteNotifications() {
    this.$ser.deleteAllNotifications().subscribe();
  }
}
