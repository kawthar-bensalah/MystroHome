import { Scenario } from './Scenario';

export class Scenarios {

    tabScenarios: Array<Scenario>; //tableau des scénarios créés par l'utilisateur

    constructor() {
        this.tabScenarios = new Array<Scenario>();
    }

    //Méthode qui permet de supprimer un scénario à partir de son id
    deleteScenario(id: number) {
        for (var i = 0; i < this.tabScenarios.length; i++)
            if (this.tabScenarios[i].id == id)
                this.tabScenarios.splice(i, 1);
    }

    //Méthode qui permet de récupérer un scénario à partir de son id
    getScenarioById(id: number) {
        for (var i = 0; i < this.tabScenarios.length; i++)
            if (this.tabScenarios[i].id == id)
                return this.tabScenarios[i];
    }

    //Méthode qui permet de récupérer tous les scénario d'un utilisateur donné
    getScenariosByOwner(owner: number) {
        var tabS = new Array<Scenario>();
        for (var i = 0; i < this.tabScenarios.length; i++)
            if (this.tabScenarios[i].owner == owner)
                tabS.push(this.tabScenarios[i]);
        return tabS;
    }

    //Méthode qui permet de mettre la valeur de l'état d'un scénario donné à "Running"
    scenarioStateRunning(id: number) {
        for (var i = 0; i < this.tabScenarios.length; i++)
            if (this.tabScenarios[i].id == id)
                this.tabScenarios[i].state = "Running";
    }

    //Méthode qui permet de mettre la valeur de l'état d'un scénario donné à "Stopped"
    scenarioStateStopped(id: number) {
        for (var i = 0; i < this.tabScenarios.length; i++)
            if (this.tabScenarios[i].id == id)
                this.tabScenarios[i].state = "Stopped";
    }

}


