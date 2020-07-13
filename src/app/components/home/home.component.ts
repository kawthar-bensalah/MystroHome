import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //Classe pour la page d'acceuil
  //La partie non commentée sont identique à une partie commentée dans la classe Main 

  theme: any;

  constructor(private $ser: DataService) { }

  ngOnInit(): void {
    this.theme = this.$ser.theme;
  }

}
