import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OneObject } from '../models/objects/object';


@Injectable({
  providedIn: 'root'
})
export class MediateurService {

  constructor(private $http: HttpClient) {
  }

  //méthode qui permet d'envoyer le scénario BPEL au médiateur
  postData(data: string): Observable<any> {
    let headers = new HttpHeaders();
    return this.$http.post('http://localhost:8080/mediateur/post', data, { headers });
  }

  //méthode qui permet d'arreter un scénario exécuter sur le médiateur
  stopScenario(name: string): Observable<any> {
    let headers = new HttpHeaders();
    return this.$http.put('http://localhost:8080/mediateur/stop', name, { headers });
  }


}