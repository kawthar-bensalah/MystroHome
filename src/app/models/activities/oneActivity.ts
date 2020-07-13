import { Activity } from './activity';

export class OneActivity extends Activity { //Classe pour les activités simples

    objectName: string; //nom de l'objet concerné par l'activité
    operationName: string; //nom de l'opération concernée par l'activité
    operationUri: string; //l'uri de l'opération concernée par l'activité
    bodyValue: any; //la valeur de body (optionnelle : si l'opération nécessite une valeur pour body)

    constructor() {
        super();
        super.type = "Activity"; //initialisé la valeur de l'attribut type à "Activity"
        this.objectName = "";
        this.operationName = "";
        this.operationUri = "";
        this.bodyValue = null;
    }

    //Méthode qui permet vérifier si les attributs de l'activité ont les bonnes valeur
    oneActivityIsComplete() {
        if (!super.activityIsComplete())
            return false;
        if (this.objectName == "" || this.operationName == "")
            return false;
        return true;
    }

}


