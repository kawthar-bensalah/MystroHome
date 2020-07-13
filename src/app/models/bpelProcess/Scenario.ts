export class Scenario { //Classe qui permet de représenter un scénario

    id: number; //id du scénario
    name: string; //le nom du scénario
    state: string; //l'état du scénario
    owner: number; //le propriétaire du scénario
    type: string; //le type du scénario (On demand, Programmable ou Extend)
    triggerType: string; //le type de déclanchement dans le cas "Programmable" (Loop, Days ou Dates)
    triggerDetails: string; //les détails de déclanchement dans le cas "Programmable" (nb heures, nb jours, les jours de la semaine ou bien les dates)
    body: string; //le code BPEL correspondant à un scnéario
    activities: string; //les activités de scénario sous format JSON

    constructor(i?: any, n?: string, s?: string, o?: number, t?: string, tt?: string, td?: string, b?: string, a?: string) {
        if (typeof i != "number") //1er constructeur avec un parametre en entrée (i) qui représente un objet de type Scenario
        {
            this.id = i.id;
            this.name = i.name;
            this.state = i.state;
            this.owner = i.owner;
            this.type = i.type;
            this.triggerType = i.triggerType;
            this.triggerDetails = i.triggerDetails;
            this.body = i.body;
            this.activities = i.activities;
        }
        else //2eme constructeur avec tous les parametres d'un scénario en entrée (i de type "number")
        {
            this.id = i;
            this.name = n;
            this.state = s;
            this.owner = o;
            this.type = t;
            this.triggerType = tt;
            this.triggerDetails = td;
            this.body = b;
            this.activities = a;
        }

    }

    //Méthode qui permet de convertir le scénario en format JSPN
    jsonFormat() {
        return ("{" +
            "\"id\" : " + "\"" + this.id + "\"" + "," +
            "\"name\" : " + "\"" + this.name + "\"" + "," +
            "\"state\" : " + "\"" + this.state + "\"" + "," +
            "\"owner\" : " + this.owner + "," +
            "\"type\" : " + "\"" + this.type + "\"" + "," +
            "\"triggerType\" : " + "\"" + this.triggerType + "\"" + "," +
            "\"triggerDetails\" : " + "\"" + this.triggerDetails + "\"" + "," +
            "\"body\" : " + "\"" + this.body.split("\"").join("'") + "\"" + "," +
            "\"activities\" : " + "\"" + this.activities + "\"" +
            "}");
    }
}