import { Optional } from '@angular/core';

export class notification { //classe qui représente un notification

    id: number; //id de la notification
    date: string; //date de la notification
    message: string; //contenu de la notification

    constructor(i?: any, d?: string, m?: string) {
        if (typeof i != "number") //1er constructeur avec un paramètre de type "notification"
        {
            this.id = i.id;
            this.date = i.date;
            this.message = i.message;
        }
        else //2eme constructeur avec tous les paramètres
        {
            this.id = i;
            this.date = d;
            this.message = m;
        }

    }

    //Convertir la notification en format JSON
    jsonFormat() {
        return ("{" +
            "\"id\" : " + this.id + "," +
            "\"date\" : " + "\"" + this.date + "\"" + "," +
            "\"message\" : " + "\"" + this.message + "\"" +
            "}");
    }
}