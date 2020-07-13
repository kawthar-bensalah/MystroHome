import { Activity } from './activity';
import { ParallelActivities } from './ParallelActivities';
import { ConditionalActivities } from './conditionalActivities';
import { LoopActivities } from './loopActivities';
import { OneActivity } from './oneActivity';

export class Activities {
    //tableau contenant tous les activités d'un scénario donné
    tabActivities: Array<Activity>;

    constructor() {
        this.tabActivities = new Array<Activity>();
    }

    //Méthode qui permet d'ajouter une nouvelle activité au tableau des activités
    addActivity(act: Activity) {
        var activity;
        if (act instanceof OneActivity) //Type Activité simple
            activity = act;
        else if (act instanceof ParallelActivities) { //Cas Bloc activités parallèles
            activity = act as ParallelActivities;
            for (var i = 0; i < activity.subActivities.length; i++)
                if (activity.subActivities[i].type == "Created activity") { //cas la sous activités existe déjà ("Created activity" => Une activity de type Parallel, Conditional ou Loop)
                    activity.subActivities[i] = this.removeActivity(activity.subActivities[i].name);
                    activity.subActivities[i].triggerEvent = "";
                }
        }
        else if (act instanceof ConditionalActivities) { //Cas activité conditionnelle
            activity = act as ConditionalActivities;
            if (activity.ifActivity.type == "Created activity") { //cas activité de bloc IF existe déjà ("Created activity")
                activity.ifActivity = this.removeActivity(activity.ifActivity.name);
                activity.ifActivity.triggerEvent = "";
            }
            if (activity.elseActivity)
                if (activity.elseActivity.type == "Created activity") { //cas activité de bloc ELSE existe déjà ("Created activity")
                    activity.elseActivity = this.removeActivity(activity.elseActivity.name);
                    activity.elseActivity.triggerEvent = "";
                }

        }
        else if (act instanceof LoopActivities) { //Cas activité qui boucle
            activity = act as LoopActivities;
            if (activity.loopActivity.type == "Created activity") { //cas activité de bloc WHILE existe déjà ("Created activity")
                activity.loopActivity = this.removeActivity(activity.loopActivity.name);
                activity.loopActivity.triggerEvent = "";
            }

        }
        this.tabActivities.push(activity); //Ajouter l'activité au tableau des activités
    }

    //Méthode qui permet de récupérer les noms de toutes les activités
    getAllActivitiesName() { 
        var tabAllActivities = new Array<string>();
        for (var i = 0; i < this.tabActivities.length; i++) {
            tabAllActivities.push(this.tabActivities[i].name);
            if (this.tabActivities[i] instanceof ParallelActivities) {
                var paraAct = this.tabActivities[i] as ParallelActivities;
                for (var j = 0; j < paraAct.subActivities.length; j++)
                    tabAllActivities.push(paraAct.subActivities[j].name);
            }
            else if (this.tabActivities[i] instanceof ConditionalActivities) {
                var condAct = this.tabActivities[i] as ConditionalActivities;

                tabAllActivities.push(condAct.ifActivity.name);
                if (condAct.elseActivity != null)
                    tabAllActivities.push(condAct.elseActivity.name);
            }
            else if (this.tabActivities[i] instanceof LoopActivities)
                tabAllActivities.push((this.tabActivities[i] as LoopActivities).loopActivity.name);
        }
        return tabAllActivities;
    }

    //Méthode qui indique si il existe une activité qui dépend d'une autre activité avec un nom donné comme paramètre d'entrée
    hasDependActivity(name: string) {
        for (var i = 0; i < this.tabActivities.length; i++)
            if (this.tabActivities[i].triggerEvent == "After")
                if (this.tabActivities[i].dependsActivityName == name)
                    return true;
        return false;
    }

    //Méthode permettant la récupération de toutes les activtés qui peuvent précéder une autre activité 
    getAfterActivities() {
        var tabAfterActivities = new Array<string>();
        for (var i = 0; i < this.tabActivities.length; i++) {
            if (!this.hasDependActivity(this.tabActivities[i].name))
                tabAfterActivities.push(this.tabActivities[i].name);
            if (this.tabActivities[i] instanceof ParallelActivities) {
                var paraAct = this.tabActivities[i] as ParallelActivities;
                for (var j = 0; j < paraAct.subActivities.length; j++)
                    if (!this.hasDependActivity(paraAct.subActivities[j].name))
                        tabAfterActivities.push(paraAct.subActivities[j].name);
            }
            else if (this.tabActivities[i] instanceof ConditionalActivities) {
                var condAct = this.tabActivities[i] as ConditionalActivities;
                if (!this.hasDependActivity(condAct.ifActivity.name))
                    tabAfterActivities.push(condAct.ifActivity.name);
                if (condAct.elseActivity != null)
                    if (!this.hasDependActivity(condAct.elseActivity.name))
                        tabAfterActivities.push(condAct.elseActivity.name);
            }
            else if (this.tabActivities[i] instanceof LoopActivities)
                if (!this.hasDependActivity((this.tabActivities[i] as LoopActivities).loopActivity.name))
                    tabAfterActivities.push((this.tabActivities[i] as LoopActivities).loopActivity.name);
        }
        return tabAfterActivities;
    }

    //Méthode permettant la récupération de toutes les activtés qui peuvent etre ajoutées comme une activité de type "Created Activity"  
    getCreatedActivities() {
        var tabCreatedActivities = new Array<string>();
        for (var i = 0; i < this.tabActivities.length; i++)
            if (this.tabActivities[i].type != "Activity")
                tabCreatedActivities.push(this.tabActivities[i].name);
        return tabCreatedActivities;
    }

    //Méthode qui permet de supprimer une activité
    removeActivity(name: string) {
        var removedActivity = null;
        for (var i = 0; i < this.tabActivities.length; i++) {
            if (this.tabActivities[i].name == name) {
                removedActivity = this.tabActivities[i];
                this.tabActivities.splice(i, 1);
            }
            else if (this.tabActivities[i] instanceof ParallelActivities) {
                for (var j = 0; j < (this.tabActivities[i] as ParallelActivities).subActivities.length; j++)
                    if ((this.tabActivities[i] as ParallelActivities).subActivities[j].name == name) {
                        removedActivity = (this.tabActivities[i] as ParallelActivities).subActivities[j];
                        (this.tabActivities[i] as ParallelActivities).subActivities.splice(j, 1);
                    }
            }
            else if (this.tabActivities[i] instanceof ConditionalActivities) {
                var condAct = this.tabActivities[i] as ConditionalActivities;
                if (condAct.elseActivity.name != null)
                    if (condAct.elseActivity.name == name) {
                        removedActivity = condAct.elseActivity;
                        condAct.elseActivity = null;
                    }
            }
        }
        return removedActivity;
    }

    //Convertir le contenu de tableau des activités en format JSON
    jsonFormat() {
        var json = "[";
        for (var i = 0; i < this.tabActivities.length; i++) {
            json += "{" +
                "\"name\" : " + "\"" + this.tabActivities[i].name + "\"" + "," +
                "\"type\" : " + "\"" + this.tabActivities[i].type + "\"" + "," +
                "\"triggerEvent\" : " + "\"" + this.tabActivities[i].triggerEvent + "\"" + "," +
                "\"dependsActivityName\" : " + "\"" + this.tabActivities[i].dependsActivityName + "\"" + "," +
                "\"date\" : " + "\"" + this.tabActivities[i].date + "\"" + "," +
                "\"timeout\" : " + "\"" + this.tabActivities[i].timeout + "\"" + ",";
            switch (this.tabActivities[i].type) {
                case "Activity":
                    var oneAct = this.tabActivities[i] as OneActivity;
                    
                    if ( (typeof oneAct.bodyValue).toString() == "string")
                        oneAct.bodyValue = oneAct.bodyValue.split("'").join("-")               

                    json +=
                        "\"objectName\" : " + "\"" + oneAct.objectName + "\"" + "," +
                        "\"operationName\" : " + "\"" + oneAct.operationName + "\"" + "," +
                        "\"operationUri\" : " + "\"" + oneAct.operationUri + "\"" + "," +
                        "\"bodyValue\" : " + "\"" + oneAct.bodyValue + "\"" + "},";
                    break;
                case "Parallel Activities":
                    var paraAct = this.tabActivities[i] as ParallelActivities;
                    json += "\"subActivities\" : [";
                    for (var j = 0; j < paraAct.subActivities.length; j++) {
                        if ( (typeof paraAct.subActivities[j].bodyValue).toString() == "string")
                            paraAct.subActivities[j].bodyValue = paraAct.subActivities[j].bodyValue.split("'").join("-")    

                        json += "{\"name\" : " + "\"" + paraAct.subActivities[j].name + "\"" + "," +
                            "\"type\" : " + "\"" + paraAct.subActivities[j].type + "\"" + "," +
                            "\"triggerEvent\" : " + "\"" + paraAct.subActivities[j].triggerEvent + "\"" + "," +
                            "\"dependsActivityName\" : " + "\"" + paraAct.subActivities[j].dependsActivityName + "\"" + "," +
                            "\"date\" : " + "\"" + paraAct.subActivities[j].date + "\"" + "," +
                            "\"timeout\" : " + "\"" + paraAct.subActivities[j].timeout + "\"" + "," +
                            "\"objectName\" : " + "\"" + paraAct.subActivities[j].objectName + "\"" + "," +
                            "\"operationName\" : " + "\"" + paraAct.subActivities[j].operationName + "\"" + "," +
                            "\"operationUri\" : " + "\"" + paraAct.subActivities[j].operationUri + "\"" + "," +
                            "\"bodyValue\" : " + "\"" + paraAct.subActivities[j].bodyValue + "\"" + "},";
                    }
                    json += "]},";
                    break;
                case "Conditional Activities":
                    var condAct = this.tabActivities[i] as ConditionalActivities;
                    json += "\"ifCondition\" : " + "\"" + condAct.ifCondition.split("'").join("-") + "\"" + ",";
                    //IF ACTIVITY
                    if ( (typeof condAct.ifActivity.bodyValue).toString() == "string")
                        condAct.ifActivity.bodyValue = condAct.ifActivity.bodyValue.split("'").join("-") 
                    json += "\"ifActivity\" : {" +
                        "\"name\" : " + "\"" + condAct.ifActivity.name + "\"" + "," +
                        "\"type\" : " + "\"" + condAct.ifActivity.type + "\"" + "," +
                        "\"triggerEvent\" : " + "\"" + condAct.ifActivity.triggerEvent + "\"" + "," +
                        "\"dependsActivityName\" : " + "\"" + condAct.ifActivity.dependsActivityName + "\"" + "," +
                        "\"date\" : " + "\"" + condAct.ifActivity.date + "\"" + "," +
                        "\"timeout\" : " + "\"" + condAct.ifActivity.timeout + "\"" + "," +
                        "\"objectName\" : " + "\"" + condAct.ifActivity.objectName + "\"" + "," +
                        "\"operationName\" : " + "\"" + condAct.ifActivity.operationName + "\"" + "," +
                        "\"operationUri\" : " + "\"" + condAct.ifActivity.operationUri + "\"" + "," +
                        "\"bodyValue\" : " + "\"" + condAct.ifActivity.bodyValue + "\"" + "},";
                    //ELSE ACTIVITY
                    json += "\"elseActivity\" : ";
                    if (condAct.elseActivity != null)
                    {
                        if ( (typeof condAct.elseActivity.bodyValue).toString() == "string")
                            condAct.elseActivity.bodyValue = condAct.elseActivity.bodyValue.split("'").join("-") 
                        json += "{\"name\" : " + "\"" + condAct.elseActivity.name + "\"" + "," +
                        "\"type\" : " + "\"" + condAct.elseActivity.type + "\"" + "," +
                        "\"triggerEvent\" : " + "\"" + condAct.elseActivity.triggerEvent + "\"" + "," +
                        "\"dependsActivityName\" : " + "\"" + condAct.elseActivity.dependsActivityName + "\"" + "," +
                        "\"date\" : " + "\"" + condAct.elseActivity.date + "\"" + "," +
                        "\"timeout\" : " + "\"" + condAct.elseActivity.timeout + "\"" + "," +
                        "\"objectName\" : " + "\"" + condAct.elseActivity.objectName + "\"" + "," +
                        "\"operationName\" : " + "\"" + condAct.elseActivity.operationName + "\"" + "," +
                        "\"operationUri\" : " + "\"" + condAct.elseActivity.operationUri + "\"" + "," +
                        "\"bodyValue\" : " + "\"" + condAct.elseActivity.bodyValue + "\"" + "},";
                    }
                        else
                        json += "\"null\"},";
                    break;
                case "Loop Activities":
                    if ( (typeof loopAct.loopActivity.bodyValue).toString() == "string")
                        loopAct.loopActivity.bodyValue = loopAct.loopActivity.bodyValue.split("'").join("-") 
                    var loopAct = this.tabActivities[i] as LoopActivities;
                    json += "\"loopCondition\" : " + "\"" + loopAct.loopCondition.split("'").join("-") + "\"" + ",";
                    json += "\"loopActivity\" : {" +
                        "\"name\" : " + "\"" + loopAct.loopActivity.name + "\"" + "," +
                        "\"type\" : " + "\"" + loopAct.loopActivity.type + "\"" + "," +
                        "\"triggerEvent\" : " + "\"" + loopAct.loopActivity.triggerEvent + "\"" + "," +
                        "\"dependsActivityName\" : " + "\"" + loopAct.loopActivity.dependsActivityName + "\"" + "," +
                        "\"date\" : " + "\"" + loopAct.loopActivity.date + "\"" + "," +
                        "\"timeout\" : " + "\"" + loopAct.loopActivity.timeout + "\"" + "," +
                        "\"objectName\" : " + "\"" + loopAct.loopActivity.objectName + "\"" + "," +
                        "\"operationName\" : " + "\"" + loopAct.loopActivity.operationName + "\"" + "," +
                        "\"operationUri\" : " + "\"" + loopAct.loopActivity.operationUri + "\"" + "," +
                        "\"bodyValue\" : " + "\"" + loopAct.loopActivity.bodyValue + "\"" + "}},";
                    break;
            }
        }
        json += "]";
        //Correction
        json = json.split(",}").join("}");
        json = json.split(",]").join("]");
        json = json.split("\"").join("'");
        return json;
    }

}


