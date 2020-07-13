import { Activity } from './activity';

export class ConditionalActivities extends Activity { //Classe pour les activités conditionnelles

    ifCondition: string; //la condition de IF
    ifConditionAttributs: Map<string, string>; //HashMap contenant les attributs des objets utilisés dans la condition
    ifActivity: any; //l'activité du bloc IF
    elseActivity: any; //l'activité du bloc ELSE

    constructor() {
        super();
        super.type = "Conditional Activities"; //initialisé la valeur de l'attribut type à "Conditional Activities"
        this.ifCondition = "";
        this.ifConditionAttributs = new Map<string, string>();
        this.ifActivity = null;
        this.elseActivity = null;
    }

    //Méthode qui permet vérifier si les attributs de l'activité conditionnelle ont les bonnes valeur
    conditionalActivitiesIsComplete() {
        if (!super.activityIsComplete())
            return false;
        if (this.ifCondition == "" || this.ifActivity == null)
            return false;
        return true;
    }

}


