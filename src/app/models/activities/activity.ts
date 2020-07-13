export class Activity { //Classe qui regroupe les attributs commun entre les différents types d'activités
    
    name : string; //nom de l'activité
    type : string; //type de l'activité (Activity, ParallelActivities, ConditionalActivities ou LoopActivities)
    triggerEvent : string; //type de l'évenement de déclanchement de l'activité (At ou After)
    dependsActivityName : string; //nom de l'activité dont dépend l'activité courante (cas triggerEvent="After")
    date : any; //Date de déclanchement de l'activité  (cas triggerEvent="At")
    timeout : number; //Délai d'attente avant que l'activité se déclanchera (cas triggerEvent="After")

    constructor(){
        this.name = "";
        this.triggerEvent = "";
        this.dependsActivityName = "";
        this.timeout = 0;
        this.date = null;        
    }

    //Méthode qui indique si tous les attributs d'une activité ont les bonnes valeurs
    activityIsComplete(){
        if(this.name == "" || this.triggerEvent == "")
            return false;
        if(this.triggerEvent == "At" && this.date == null)
            return false;
        if(this.triggerEvent == "After" && this.dependsActivityName == "")
            return false;
        return true;
    }
}


