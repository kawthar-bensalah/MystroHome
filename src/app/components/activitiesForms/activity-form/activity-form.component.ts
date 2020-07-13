import { Component, OnInit } from '@angular/core';
import { objects } from 'src/app/models/objects/objects';
import { OneActivity } from 'src/app/models/activities/oneActivity';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { Activities } from 'src/app/models/activities/activities';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  obj : objects;  
  act : OneActivity;
  acts : Activities;
  bpelProcess : bpelGenerator;


  constructor(private $ser: DataService, private $service: BpelGeneratorService) { }

  async ngOnInit(): Promise<void> {
    this.obj = new objects();
    this.act = new OneActivity();
    this.acts = this.$service.getActivities();
    this.bpelProcess = this.$service.getBpelProcess();
    if(this.bpelProcess.processType == "On demande")
      this.act.triggerEvent = "Independent";
    else
      this.act.triggerEvent = "At";
    this.obj = await this.$ser.getAllObjectsDescription();
  }

  addNewActivity(form : NgForm){
    this.act.operationUri = this.obj.getUriOperation(this.act.objectName, this.act.operationName);
    this.$service.addActivity(this.act);    
    this.act = new OneActivity();
    form.reset();
    if(this.bpelProcess.processType == "On demande")
      this.act.triggerEvent = "Independent";
    else
      this.act.triggerEvent = "At";
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
    return this.act.oneActivityIsComplete();
  }

  afterClick(){
    if (this.act.triggerEvent=="Independent")
      this.act.triggerEvent = "After";
    else
      this.act.triggerEvent = "Independent";
  }

  
}
