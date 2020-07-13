import { Component, OnInit } from '@angular/core';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { DataService } from 'src/app/services/data.service';
import { Scenario } from 'src/app/models/bpelProcess/Scenario';
import { MediateurService } from 'src/app/services/mediateur.service';
import { Activities } from 'src/app/models/activities/activities';
import { Users } from 'src/app/models/user/users';
import { User } from 'src/app/models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-execute-process',
  templateUrl: './save-execute-process.component.html',
  styleUrls: ['./save-execute-process.component.scss']
})
export class SaveExecuteProcessComponent implements OnInit {

  bpelProcess : bpelGenerator;
  activities : Activities;
  users : Users;
  
  constructor(private $service: BpelGeneratorService, private $ser: DataService, private $serv:MediateurService, private $router: Router) { }

  ngOnInit(): void {
    this.bpelProcess = this.$service.getBpelProcess();
    if(!this.bpelProcess.hasProcessName())
    {
      this.$router.navigate(['../main/editing/myScenarios']);
    }
    this.activities = this.$service.getActivities();
    this.users = new Users();
    this.$ser.getAllUsers().subscribe(((users) => {
      this.users.tabUsers = (users || []).map(item => new User(item))
    }));
  }

  action(type:string){
    this.bpelProcess.variablesDeclaration(); //Add variables declarations   
    switch(type)
    {
      case "Export" : //Export
        this.bpelProcess.processCorrection();
        var fileSaver = require('file-saver');
        var file = new File([this.bpelProcess.process.outerHTML], 
                              this.bpelProcess.process.getAttribute("name")+".bpel", 
                              {type: "application/xml;charset=utf-8"});
        fileSaver.saveAs(file);
        break;
      case "Save" : //Save 
        var scenario = new Scenario(
          this.bpelProcess.processId,
          this.bpelProcess.getProcessName(),
          "Stopped",
          this.users.getUserByEmail(JSON.parse(localStorage.getItem('user')).login).id,
          this.bpelProcess.processType,
          this.bpelProcess.triggerDetailsType,
          this.bpelProcess.triggerDetailsData,
          this.bpelProcess.process.outerHTML,
          this.activities.jsonFormat()
        ).jsonFormat();
        switch(this.$service.getGenerationType())
        {
          case "INSERT" :
            this.$ser.saveProcess(scenario).subscribe();
            break;
          case "UPDATE" :
            this.$ser.updateProcess(scenario).subscribe();
            break;
        }
        location.replace('../main/editing/myScenarios');
        break;
      case "Execute":
        //Save
        var scenario = new Scenario(
          this.bpelProcess.processId,
          this.bpelProcess.getProcessName(),
          "Running",
          this.users.getUserByEmail(JSON.parse(localStorage.getItem('user')).login).id,
          this.bpelProcess.processType,
          this.bpelProcess.triggerDetailsType,
          this.bpelProcess.triggerDetailsData,
          this.bpelProcess.process.outerHTML,
          this.activities.jsonFormat()
        ).jsonFormat();
        switch(this.$service.getGenerationType())
        {
          case "INSERT" :
            this.$ser.saveProcess(scenario).subscribe();
            break;
          case "UPDATE" :
            this.$ser.updateProcess(scenario).subscribe();
            break;
        }
        //Execute
        this.bpelProcess.processCorrection();
        this.$serv.postData(this.bpelProcess.process.outerHTML).subscribe(
          result=>{},
          err=>{
            alert("An error has occurred at the mediator service !");
          });
        location.replace('../main/editing/myScenarios');
        break;
    }
    this.$service.reset();
  }
}
