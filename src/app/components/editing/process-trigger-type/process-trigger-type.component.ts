import { Component, OnInit } from '@angular/core';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-trigger-type',
  templateUrl: './process-trigger-type.component.html',
  styleUrls: ['./process-trigger-type.component.scss']
})
export class ProcessTriggerTypeComponent implements OnInit {
  bpelProcess : bpelGenerator;

  constructor(private $service: BpelGeneratorService, private $router: Router) { }

  ngOnInit() {
    this.bpelProcess = this.$service.getBpelProcess();
    if(!this.bpelProcess.hasProcessName())
    {
      this.$router.navigate(['../main/editing/myScenarios']);
    }
    this.bpelProcess.processType = "On demande";
  }
  
  addProcessTriggerType(){
    this.bpelProcess.AddProcessTriggerType(this.bpelProcess.processType);
  }

  changeChoice(choice:string){
    this.bpelProcess.processType = choice;
  }

}
