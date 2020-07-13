import { Component, OnInit } from '@angular/core';
import { objects } from 'src/app/models/objects/objects';
import { Activities } from 'src/app/models/activities/activities';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { Activity } from 'src/app/models/activities/activity';
import { ParallelActivities } from 'src/app/models/activities/ParallelActivities';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { OneActivity } from 'src/app/models/activities/oneActivity';

@Component({
  selector: 'app-paralle-activities-form',
  templateUrl: './paralle-activities-form.component.html',
  styleUrls: ['./paralle-activities-form.component.scss']
})
export class ParalleActivitiesFormComponent implements OnInit {
 
  obj : objects;  
  acts : Activities;
  bpelProcess : bpelGenerator;
  subAct : any;
  act: ParallelActivities;

  theme : any;


  constructor(private $ser: DataService, private $service: BpelGeneratorService) { }

  async ngOnInit(): Promise<void> {
    this.theme = this.$ser.theme;

    this.obj = new objects();
    this.acts = this.$service.getActivities();
    this.bpelProcess = this.$service.getBpelProcess();
    this.subAct = new Activity();
    this.act = new ParallelActivities();
    if(this.bpelProcess.processType == "On demande")
      this.act.triggerEvent = "Independent";
    else
      this.act.triggerEvent = "At";  
    this.obj = await this.$ser.getAllObjectsDescription();
    }


  addNewActivity(form : NgForm){
    this.$service.addActivity(this.act);
    this.act = new ParallelActivities();
    form.reset();  
    if(this.bpelProcess.processType == "On demande")
      this.act.triggerEvent = "Independent";
    else
      this.act.triggerEvent = "At";
  }

  addNewSubActivity(){
    this.subAct.operationUri = this.obj.getUriOperation(this.subAct.objectName, this.subAct.operationName);
    this.act.addSubActivity(this.subAct);
    this.subAct = new Activity();
  }

  deleteSubActivities()
  {
    this.act.deleteAllSubActivities();
  }

  activityNameExist(name:string){
    var allActivitiesTab = this.acts.getAllActivitiesName();
    for(var i=0; i<allActivitiesTab.length; i++)
      if (allActivitiesTab[i] == name)
        return true;
    return false;
  }

  AllFieldsAreWellFilled(){
    if (this.activityNameExist(this.act.name) == true)
      return false;
    return this.act.parallelActivitiesIsComplete();
  }

  subActActivityNameExist(name:string){
    if(this.subAct.type == "Created activity")
      return false;
    if(name != "" && name == this.act.name)
      return true;
    return this.activityNameExist(name);
  }

  subActAllFieldsAreWellFilled(){
    if(this.subActActivityNameExist(this.subAct.name) == true)
      return false;
    if(this.subAct.name == "")
      return false;
    if(this.subAct.type == "New Activity")
      if(this.subAct.objectName == "" || this.subAct.operationName == "")
        return false;
    return true;
  }

  afterClick(){
    if (this.act.triggerEvent=="Independent")
      this.act.triggerEvent = "After";
    else
      this.act.triggerEvent = "Independent";
  }

}
