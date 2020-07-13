import { Activity } from './activity';
import { OneActivity } from './oneActivity';

export class ParallelActivities extends Activity {  //Classe pour le bloc d'activités en parallèle

    subActivities: Array<OneActivity>; //tableau contenant les sous activités du bloc

    constructor() {
        super();
        super.type = "Parallel Activities"; //initialisé la valeur de l'attribut type à "Parallel Activities"
        this.subActivities = new Array<OneActivity>();
    }

    //Méthode qui permet d'ajouter une activité au bloc
    addSubActivity(sa: OneActivity) {
        this.subActivities.push(sa);
    }

    //Méthode qui permet de supprimer toutes les activités du bloc
    deleteAllSubActivities() {
        this.subActivities.splice(0, this.subActivities.length);
    }

    //Méthode qui permet vérifier si les attributs de bloc ont les bonnes valeur
    parallelActivitiesIsComplete() {
        if (!super.activityIsComplete())
            return false;
        if (this.subActivities.length < 2)
            return false;
        return true;
    }

}


