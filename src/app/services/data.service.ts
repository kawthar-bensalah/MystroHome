import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { objects } from '../models/objects/objects';
import { OneObject } from '../models/objects/object';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //attribut qui permet de stocker le thème courant pour un compte donné
  theme = {
    currentTheme: "Theme1",
    backgroundMain: "../../../assets/images/Theme1/back.jpg",
    backgroundMenu: "../../../assets/images/Theme1/navBack.jpg",
    backgroundHeader: "../../../assets/images/Theme1/headerBack.jpg",
    backgroundFooter: "../../../assets/images/Theme1/footerBack.jpg",
    backgroundForm: "../../../assets/images/Theme1/formBack.jpg",
  };

  constructor(private $http: HttpClient) { }

  //Méthode qui permet de modifier le thème pour un compte donné
  setTheme(theme: string) {
    if (this.theme.currentTheme != theme) {
      this.theme.currentTheme = theme;
      this.theme.backgroundMain = "../../../assets/images/" + theme + "/back.jpg";
      this.theme.backgroundMenu = "../../../assets/images/" + theme + "/navBack.jpg";
      this.theme.backgroundHeader = "../../../assets/images/" + theme + "/headerBack.jpg";
      this.theme.backgroundFooter = "../../../assets/images/" + theme + "/footerBack.jpg";
      this.theme.backgroundForm = "../../../assets/images/" + theme + "/formBack.jpg";
    }
  }

  //Méthode qui permet la récupération des uri de la description des services Web associés aux objets
  async getObjectsDescriptionAddress() {
    return await this.$http.get('http://localhost:9000/findAllObjects').toPromise();
  }

  //Méthode qui permet la récupération de la description d'un service Web associé à un objet
  async getObjectDescription(uri: string) {
    return await this.$http.get(uri).toPromise();
  }

  //Méthode qui permet la récupération de toutes les descriptions des services Web associés aux objets
  async getAllObjectsDescription() {
    var objs = new objects();
    var oda = await this.getObjectsDescriptionAddress();
    for (var i in oda) {
      objs.tabObjects.push(
        new OneObject(
          await this.getObjectDescription(oda[i].descriptionAddress) as OneObject
        )
      );
    }
    return objs;
  }

  //Méthode qui permet la sauvegarde de scénario dans la base de données
  saveProcess(process: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return this.$http.post('http://localhost:9000/addScenario', process, { headers });
  }

  //Méthode qui permet de modifier l'état de scénario dans la base de données
  setProcessState(processName): Observable<any> {
    let headers = new HttpHeaders();
    return this.$http.put('http://localhost:9000/setScenarioState/' + processName, { headers });
  }

  //Méthode qui permet de modifier un scénario déjà sauvegarder dans la base de données
  updateProcess(process: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return this.$http.put('http://localhost:9000/updateScenario', process, { headers });
  }

  //Méthode qui permet de récupérer tous les scénarios sauvegardés dans la base de données
  getAllProcess(): Observable<any> {
    return this.$http.get('http://localhost:9000/findAllScenarios');
  }

  //Méthode qui permet de supprimer un scénario sauvegardé dans la base de données à partir de son id
  deleteProcess(id: number): Observable<any> {
    return this.$http.delete('http://localhost:9000/deleteScenario/' + id);
  }

  //Méthode qui permet de supprimer tous les scénarios d'un utilisateur donné sauvegardés dans la base de données
  deleteProcessByOwner(owner: number): Observable<any> {
    return this.$http.delete('http://localhost:9000/deleteScenarioByOwner/' + owner);
  }

  //Méthode qui permet d'exécuter une opération directe sur un objet donné
  operation(url: string, bodyValue: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return this.$http.put(url, bodyValue, { headers });
  }

  //Méthode qui permet d'ajouter un nouveau utilisateur dans la base de données
  saveUser(user: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return this.$http.post('http://localhost:9000/addUser', user, { headers });
  }

  //Méthode qui permet de modifier un utilisateur déjà sauvegarder dans la base de données
  updateUser(user: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return this.$http.put('http://localhost:9000/updateUser', user, { headers });
  }

  //Méthode qui permet de supprimer un utilisateur donné de la base de données à partir de son id
  deleteUser(id: number): Observable<any> {
    return this.$http.delete('http://localhost:9000/deleteUser/' + id);
  }

  //Méthode synchrone qui permet de récupérer tous les utilisateurs sauvegardés dans la base de données
  getAllUsers(): Observable<any> {
    return this.$http.get('http://localhost:9000/findAllUsers');
  }

  //Méthode asynchrone qui permet de récupérer tous les utilisateurs sauvegardés dans la base de données
  async getAllUsersAsync() {
    return this.$http.get('http://localhost:9000/findAllUsers');
  }

  //Méthode qui permet de sauvegarder un message dans la base de données
  saveMessage(message: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    return this.$http.post('http://localhost:9000/addMessage', message, { headers });
  }

  //Méthode qui permet de récupérer tous les message reçus par un utilisateur donné et sauvegardés dans la base de données
  getAllMessages(receiverId: number): Observable<any> {
    return this.$http.get('http://localhost:9000/findMessageByReceiver/' + receiverId);
  }

  //Méthode qui permet de récupérer toutes les notifications sauvegardées dans la base de données
  getAllNotifications(): Observable<any> {
    return this.$http.get('http://localhost:9000/findAllNotifications');
  }

  //Méthode qui permet de supprimer toutes les notifications sauvegardées dans la base de données
  deleteAllNotifications(): Observable<any> {
    return this.$http.delete('http://localhost:9000/deleteNotifications');
  }

  //Méthode qui permet de supprimer un message donné de la base de données à partir de son id
  deleteMessage(id: number): Observable<any> {
    return this.$http.delete('http://localhost:9000/deleteMessage/' + id);
  }

  //Méthode qui permet de supprimer tous les messages envoyés par un utilisateur donné de la base de données
  deleteMessageBySender(sender: number): Observable<any> {
    return this.$http.delete('http://localhost:9000/deleteMessageBySender/' + sender);
  }

  //Méthode qui permet de supprimer tous les messages reçus par un utilisateur donné de la base de données
  deleteMessageByReceiver(receiver: number): Observable<any> {
    return this.$http.delete('http://localhost:9000/deleteMessageByReceiver/' + receiver);
  }
}
