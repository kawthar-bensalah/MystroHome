export class User { //Classe qui représente un utilisateur
    id: number; //id de l'utilisateur
    name: string; //nom de l'utilisateur
    mail: string; //email de l'utilisateur
    password: string; //mot de passe de l'utilisateur
    theme: string; //thème choisi par l'utilisateur

    constructor(i?: any, n?: string, m?: string, p?: string, t?: string) {
        if (typeof i != "number") //1er constructeur avec 1 paramètre de type User
        {
            this.id = i.id;
            this.name = i.name;
            this.mail = i.mail;
            this.password = i.password;
            this.theme = i.theme;
        }
        else { //2eme constructeur avec tous les paramètres
            this.id = i;
            this.name = n;
            this.mail = m;
            this.password = p;
            this.theme = t;
        }
    }

    //Convertir l'objet User en format JSON
    jsonFormat() {
        return ("{" +
            "\"id\" : " + "\"" + this.id + "\"" + "," +
            "\"name\" : " + "\"" + this.name + "\"" + "," +
            "\"password\" : " + "\"" + this.password + "\"" + "," +
            "\"mail\" : " + "\"" + this.mail + "\"" + "," +
            "\"theme\" : " + "\"" + this.theme + "\"" +
            "}");
    }



}