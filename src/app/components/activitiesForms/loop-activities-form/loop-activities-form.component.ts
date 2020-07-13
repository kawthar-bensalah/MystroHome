import { Component, OnInit } from '@angular/core';
import { objects } from 'src/app/models/objects/objects';
import { Activities } from 'src/app/models/activities/activities';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { LoopActivities } from 'src/app/models/activities/loopActivities';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { Activity } from 'src/app/models/activities/activity';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-loop-activities-form',
  templateUrl: './loop-activities-form.component.html',
  styleUrls: ['./loop-activities-form.component.scss']
})
export class LoopActivitiesFormComponent implements OnInit {

  obj : objects;  
  acts : Activities;
  bpelProcess : bpelGenerator;
  loopActivity : any;
  act: LoopActivities;
  val : Boolean;
  b : Boolean = true;

  theme : any;


  cond = {objectName : "", attribute : "", operator : "", value : ""};


  constructor(private $ser: DataService, private $service: BpelGeneratorService) { }

  async ngOnInit(): Promise<void> {

    this.theme = this.$ser.theme;

    this.obj = new objects();
    this.acts = this.$service.getActivities();
    this.bpelProcess = this.$service.getBpelProcess();
    this.act = new LoopActivities();
    this.loopActivity = new Activity();
    this.val=false;
    if(this.bpelProcess.processType == "On demande")
      this.act.triggerEvent = "Independent";
    else
      this.act.triggerEvent = "At";    
    this.obj = await this.$ser.getAllObjectsDescription();
    }

    check()
    {
      var regex = /(([!]{0,1})\s*\(*\s*([!]{0,1})\s*(\s*(\w+\s*(\=|\=|\<|\>|<=|>=|!=)+\s*([!]{0,1})(\w+|\'\w+\')+\s*)|([!]{0,1})\s*\(+\s*([!]{1})\s*\(+\s*(\s*(([!]{0,1})\w+\s*(\=|\=|\<|\>|<=|>=|!=)+\s*([!]{0,1})(\w+|\'\w+\')+\s*)){1})\)*\s*((and|or)\s*\(*\s*[\!]{0,1}\s*\(*((\(*\s*[\!]{0,1}\s*\w+\s*(\=|\=|\<|\>|<=|>=|!=)\s*([!]{0,1})\s*(\w+|\'\w+\')\s*\)*)\s*))*)\)*/;
      var i = 0;
      var b = true;
      var k = this.act.loopCondition;
      var match = k.split(regex);
      while (i < match.length) {
        if ( match[i] !== undefined) {
          if (match[i].length == k.length) {
            b = regex.test(match[i]);
            break;
          }
          else {
            b = b && regex.test(match[i]);    
          }
        }
        i++;
      }
      
   if(this.act.loopCondition.length!=0)
        this.b=b;
      var m = Array.from(this.act.loopCondition);
      var cpt1 = 0;
      var cpt2 = 0;
      for (var i = 0; i < m.length; i++) {
        if (m[i] == '(')
          cpt1++;
        if (m[i] == ')')
          cpt2++;
      }
      if (cpt1 != cpt2 && cpt1!=0 && cpt2!=0)
        this.b=false;
        return (this.b);
    }

    addNewActivity(form : NgForm){
      

      this.$service.addActivity(this.act);
      this.act = new LoopActivities();
      form.reset();
      if(this.bpelProcess.processType == "On demande")
        this.act.triggerEvent = "Independent";
      else
        this.act.triggerEvent = "At";
    }
  
    addLoopActivity(){
      this.act.loopActivity = new Activity();
      this.loopActivity.operationUri = this.obj.getUriOperation(this.loopActivity.objectName, this.loopActivity.operationName);
      this.act.loopActivity = this.loopActivity;
      this.loopActivity = new Activity();
    }
  
    deleteLoopActivity()
    {
      this.act.loopActivity=null;
      this.act.loopCondition = "";
    }

    addCondition(){
      this.act.loopCondition=this.act.loopCondition+' '+this.cond.objectName+this.cond.attribute+' '+this.cond.operator+' '+this.cond.value;
      this.act.loopConditionAttributs.set(this.cond.objectName+this.cond.attribute, this.obj.getAttributeUriGetter(this.cond.objectName, this.cond.attribute));
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
      return this.act.loopActivitiesIsComplete();
    }

    Show()
    {
      if(!this.val)
      this.val=true;
      else 
      this.val=false;
    }
  

    loopActActivityNameExist(name:string){
      if(this.loopActivity.type == "Created activity")
        return false;
      if(name != "" && name == this.act.name)
        return true;
      return this.activityNameExist(name);
    }
  
    loopActAllFieldsAreWellFilled(){
      if(this.loopActActivityNameExist(this.loopActivity.name) == true)
        return false;
      if(this.loopActivity.name == "")
        return false;
      if(this.loopActivity.type == "New Activity")
        if(this.loopActivity.objectName == "" || this.loopActivity.operationName == "")
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
