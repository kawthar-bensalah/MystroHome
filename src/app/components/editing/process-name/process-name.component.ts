import { Component, OnInit } from '@angular/core';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { DataService } from 'src/app/services/data.service';
import { Scenarios } from 'src/app/models/bpelProcess/Scenarios';
import { Scenario } from 'src/app/models/bpelProcess/Scenario';
import { Activity } from 'src/app/models/activities/activity';

@Component({
  selector: 'app-process-name',
  templateUrl: './process-name.component.html',
  styleUrls: ['./process-name.component.scss']
})
export class ProcessNameComponent implements OnInit {

  bpelProcess : bpelGenerator;

  scenarios : Scenarios; 

  processName : string = "";

  constructor(private $service: BpelGeneratorService, private $ser: DataService) { }

  ngOnInit(): void {
    this.$service.setActivities(new Array<Activity>());
    this.bpelProcess = this.$service.getBpelProcess();
    this.scenarios = new Scenarios();
    this.$ser.getAllProcess().subscribe(((scenarios) => {
      this.scenarios.tabScenarios = (scenarios || []).map(item => new Scenario(item))
    }));
  }

  addProcessName(){
    this.bpelProcess.AddProcessName(this.processName);
  }

  processNameExist(name:string){
    for (var i=0; i<this.scenarios.tabScenarios.length; i++)
      if(this.scenarios.tabScenarios[i].name == name)
        return true;
    return false;
  }

}
