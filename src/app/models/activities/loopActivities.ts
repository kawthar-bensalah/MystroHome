import { Activity } from './activity';

export class LoopActivities extends Activity {

    loopCondition: string; //la condition de la boucle
    loopConditionAttributs: Map<string, string>; //HashMap contenant les attributs des objets utilisés dans la condition
    loopActivity: any; //l'activité de bloc loop

    constructor() {
        super();
        super.type = "Loop Activities"; //initialisé la valeur de l'attribut type à "Loop Activities"
        this.loopConditionAttributs = new Map<string, string>();
        this.loopCondition = "";
        this.loopActivity = null;
    }

    //Méthode qui permet vérifier si les attributs de l'activité loop ont les bonnes valeur
    loopActivitiesIsComplete() {
        if (!super.activityIsComplete())
            return false;
        if (this.loopCondition == "" || this.loopActivity == null)
            return false;
        return true;
    }


}