import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  //Classe pour afficher une page d'erreur lorsqu'un problème au niveau de la base de données aura lieu

  constructor() { }

  ngOnInit(): void {
  }

}
