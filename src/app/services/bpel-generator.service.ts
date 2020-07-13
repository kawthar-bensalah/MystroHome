import { Injectable } from '@angular/core';
import { Activities } from '../models/activities/activities';
import { bpelGenerator } from '../models/bpelProcess/bpelGenerator';
import { Activity } from '../models/activities/activity';
import { Scenario } from '../models/bpelProcess/Scenario';

@Injectable({
  providedIn: 'root'
})
export class BpelGeneratorService {

  //Attribut pour stockés l'ensemble des activités d'un scénario en cours de création
  private $activities: Activities = new Activities();
  //Attribut pour stockés le processus BPEL correspondant à un scénario en cours de création
  private $bpelProcess: bpelGenerator = new bpelGenerator();
  private $generationType: string = ""; //Insert or Update

  constructor() { }

  //Méthode qui permet d'ajouter une nouvelle activité au scénario en cours de création
  addActivity(act: Activity) {
    this.$activities.addActivity(act);
    this.$bpelProcess.addNewActivity(act);
  }

  //Méthode qui permet la récupération de toutes les activités d'un scénario
  getActivities(): Activities {
    return this.$activities;
  }

  //Méthode qui permet la récupération des activités d'un scénario sauvegardé dans la base de données et les mettre dans l'attribut "$activities"
  setActivities(jsonActivities: any) {
    this.$activities.tabActivities = jsonActivities;
  }

  //Méthode qui permet de récupérer un processus BPEL corréspondant à un scénario
  getBpelProcess(): bpelGenerator {
    return this.$bpelProcess;
  }

  //Méthode qui permet la création d'un nouveau processus BPEL (initialisé l'attibut "$bpelProcess")
  newBpelProcess() {
    this.$bpelProcess = new bpelGenerator();
  }

  //Méthode qui permet de modifier un processus BPEL selon un scénario donné en entrée
  setBpelProcess(scenario: Scenario) {
    this.$bpelProcess = new bpelGenerator();
    this.$bpelProcess.processId = scenario.id;
    this.$bpelProcess.AddProcessName(scenario.name);
    this.$bpelProcess.processType = scenario.type;
    this.$bpelProcess.triggerDetailsData = scenario.triggerType;
    this.$bpelProcess.triggerDetailsData = scenario.triggerDetails;
    var body: Node = new DOMParser().parseFromString(scenario.body.split("'").join("\""), "text/xml").firstChild;
    this.$bpelProcess.process = body as Element;
    this.$bpelProcess.variables = this.$bpelProcess.process.getElementsByTagName("variables")[0];
    this.$bpelProcess.flow = this.$bpelProcess.process.getElementsByTagName("flow")[0];
  }

  //Méthode permettant la récupération de type de la génération actuelle (un nouveau scénario ou modification d'un scénario existant)
  getGenerationType() {
    return this.$generationType;
  }

  //Méthode permettant la modification de type de la génération actuelle (un nouveau scénario ou modification d'un scénario existant)
  setGenerationType(type: string) {
    this.$generationType = type;
  }

  //Méthode qui permet d'ajouter un nom au processus BPEL
  addProceesName(name: string) {
    this.$bpelProcess.AddProcessName(name);
  }

  //Méthode qui permet de récupérer le nom de processus BPEL
  getProceesName() {
    return this.$bpelProcess.getProcessName();
  }

  //Méthode qui permet la suppression d'une activité de scénario
  removeActivity(name: string) {
    this.$activities.removeActivity(name);
    this.$bpelProcess.removeActivity(name);
  }

  //Méthode qui permet de réinitialiser les attributs "$activities et $bpelProcess"
  reset() {
    this.$activities = new Activities();
    this.$bpelProcess = new bpelGenerator();
  }

}
