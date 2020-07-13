import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Scenarios } from 'src/app/models/bpelProcess/Scenarios';
import { Scenario } from 'src/app/models/bpelProcess/Scenario';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { User } from 'src/app/models/user/user';
import { Users } from 'src/app/models/user/users';
import { MediateurService } from 'src/app/services/mediateur.service';

@Component({
  selector: 'app-my-scenarios',
  templateUrl: './my-scenarios.component.html',
  styleUrls: ['./my-scenarios.component.scss']
})
export class MyScenariosComponent implements OnInit {
  theme: any;

  scenarioConfirmation: Scenario = new Scenario(0, "", "", 0, "", "", "", "", "");

  scenarios: Scenarios;

  tabChecked = new Array<number>();
  users: Users;
  currentUser: User;


  constructor(private $ser: DataService, private $service: BpelGeneratorService, private $serv: MediateurService) { }

  ngOnInit(): void {
    this.theme = this.$ser.theme;


    this.users = new Users();
    this.$ser.getAllUsers().subscribe(((users) => {
      this.users.tabUsers = (users || []).map(item => new User(item))
      this.currentUser = this.users.getUserByEmail(this.getCurrentUser());
      //SCENARIOS
      this.scenarios = new Scenarios();
      this.$ser.getAllProcess().subscribe(((scenarios) => {
        this.scenarios.tabScenarios = (scenarios || []).map(item => new Scenario(item))
      }));
    }));
  }

  //ADD METHODS
  addScenario() {
    this.$service.newBpelProcess();
    this.$service.setGenerationType("INSERT");
  }


  //UPDATE METHODS
  updateScenario(scenario: Scenario) {
    this.$service.setGenerationType("UPDATE");
    this.$service.setActivities(JSON.parse(scenario.activities.split("'").join("\"").split("-").join("'")));
    this.$service.setBpelProcess(scenario);
  }


  //REMOVE METHODS
  deleteScenario(id: number) {
    //Stop Scenario
    if (this.scenarios.getScenarioById(id).state == "Running") {
      this.$serv.stopScenario(this.scenarios.getScenarioById(id).name).subscribe(
        result => {
          this.scenarios.scenarioStateStopped(id);
          //BD Delete
          this.$ser.deleteProcess(id).subscribe();
          //Display Delete
          this.scenarios.deleteScenario(id);
        },
        err => {
          alert("An error has occurred at the mediator service !");
        });
    }
    else {
      //BD Delete
      this.$ser.deleteProcess(id).subscribe();
      //Display Delete
      this.scenarios.deleteScenario(id);
    }


  }

  deleteAllScenarios() {
    for (var i = 0; i < this.tabChecked.length; i++) {
      this.$ser.deleteProcess(this.tabChecked[i]).subscribe();
      this.scenarios.deleteScenario(this.tabChecked[i]);
    }
  }

  //EXECUTE METHODES
  executeScenario(scenario: Scenario) {
    this.$service.setBpelProcess(scenario);
    this.$service.getBpelProcess().processCorrection();
    this.$serv.postData(this.$service.getBpelProcess().process.outerHTML).subscribe(
      result => { },
      err => {
        this.scenarios.scenarioStateStopped(scenario.id);
        alert("An error has occurred at the mediator service !");
      });
    this.$ser.setProcessState(scenario.name).subscribe();
    this.scenarios.scenarioStateRunning(scenario.id);
  }

  //STOP METODES
  stopScenario(scenario: Scenario) {
    this.$serv.stopScenario(scenario.name).subscribe(
      result => {
        this.scenarios.scenarioStateStopped(scenario.id);
      },
      err => {
        alert("An error has occurred at the mediator service !");
      });
  }


  //CHECK METHODS
  check(event: any, id: number) {
    if (event.target.checked)
      this.tabChecked.push(id);
    else
      for (var i = 0; i < this.tabChecked.length; i++)
        if (this.tabChecked[i] == id)
          this.tabChecked.splice(i, 1);
  }

  checkAll(event: any) {
    if (event.target.checked)
      for (var i = 0; i < this.scenarios.tabScenarios.length; i++)
        this.tabChecked.push(this.scenarios.tabScenarios[i].id);
    else
      this.tabChecked.splice(0, this.tabChecked.length);
  }

  scenarioIsChecked(id: number) {
    for (var i = 0; i < this.tabChecked.length; i++)
      if (this.tabChecked[i] == id)
        return true;
    return false;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')).login;
  }
}
