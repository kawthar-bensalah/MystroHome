import { Optional } from '@angular/core';

export class Message {
    id: number;
    text: string;
    sender: number;
    receiver: number;
    date: string;

    constructor(i?: any, t?: string, s?: number, r?: number, d?: string) {
        if (typeof i != "number") //1er constructeur avec un paramètre de type Message
        {
            this.id = i.id;
            this.text = i.text;
            this.sender = i.sender;
            this.receiver = i.receiver;
            this.date = i.date;
        }
        else //2eme constructeur avec tous les paramètres
        {
            this.id = i;
            this.text = t;
            this.sender = s;
            this.receiver = r;
            this.date = d;
        }

    }

    //Convertir le message en format JSON
    jsonFormat() {
        return ("{" +
            "\"id\" : " + this.id + "," +
            "\"text\" : " + "\"" + this.text + "\"" + "," +
            "\"sender\" : " + this.sender + "," +
            "\"receiver\" : " + this.receiver + "," +
            "\"date\" : " + "\"" + this.date + "\"" +
            "}");
    }
}