import { Component, OnInit } from '@angular/core';
import { objects } from '../../models/objects/objects';
import { DataService } from 'src/app/services/data.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-my-object',
  templateUrl: './my-object.component.html',
  styleUrls: ['./my-object.component.scss']
})
export class MyObjectComponent implements OnInit {
  //Classe pour afficher les objets disponibles
  //La partie non commentée sont identique à une partie commentée dans la classe Main 

  obj: objects; //attribut pour récupérer les objets disponibles
  opName: Array<string> = new Array<string>(); //tableau contenant le nom des opérations d'un objet
  bodyValue: Array<any> = new Array<any>(); //tableau contenant les valeurs possible pour le body d'une opération

  theme: any;

  constructor(private $ser: DataService) { }

  async ngOnInit(): Promise<void> {
    this.theme = this.$ser.theme;

    this.obj = new objects();
    this.obj = await this.$ser.getAllObjectsDescription();
    var oldObjects = new objects();
    oldObjects = this.obj;

    interval(100).subscribe(async s => {
      var newObjects = await this.$ser.getAllObjectsDescription();
      if (newObjects.isUpdated(oldObjects.tabObjects) != false) {
        this.obj = await this.$ser.getAllObjectsDescription();
        oldObjects = newObjects;
      }
    });

  }

  //récupérer les opérations d'un objet avec un nom donné
  getOp(objName: string) {
    for (var i = 0; i < this.obj.tabObjects.length; i++) {
      if (this.obj.tabObjects[i].name == objName) {
        return this.obj.tabObjects[i].operations;
      }
    }
  }

  //exécuter une opération sur un objet
  execute(obj: string, op: string, bodyValue: any) {
    if (bodyValue !== undefined)
      this.$ser.operation(this.obj.getUriOperation(obj, op), bodyValue).subscribe();
    else
      this.$ser.operation(this.obj.getUriOperation(obj, op), null).subscribe();
  }

}
