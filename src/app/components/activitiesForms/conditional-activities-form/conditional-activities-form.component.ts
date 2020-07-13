import { Component, OnInit, ComponentRef } from '@angular/core';
import { objects } from 'src/app/models/objects/objects';
import { Activities } from 'src/app/models/activities/activities';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { ConditionalActivities } from 'src/app/models/activities/conditionalActivities';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { Activity } from 'src/app/models/activities/activity';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-conditional-activities-form',
  templateUrl: './conditional-activities-form.component.html',
  styleUrls: ['./conditional-activities-form.component.scss']
})
export class ConditionalActivitiesFormComponent implements OnInit {

  obj : objects;  
  acts : Activities;
  bpelProcess : bpelGenerator;
  ifActivity : any;
  subIf : Array<any>;
  elseActivity : any;
  act: ConditionalActivities;
  b : Boolean = true;


  cond = {objectName : "", attribute : "", operator : "", value : ""};

  theme : any;

  title:any;
  val: Boolean;

  constructor(private $ser: DataService, private $service: BpelGeneratorService) { }

  async ngOnInit(): Promise<void> {

    this.theme = this.$ser.theme;

    this.obj = new objects();
    this.acts = this.$service.getActivities();
    this.bpelProcess = this.$service.getBpelProcess();
    this.act = new ConditionalActivities();
    this.ifActivity = new Activity();
    this.elseActivity = new Activity();
    this.subIf=new Array<any>();
    if(this.bpelProcess.processType == "On demande")
      this.act.triggerEvent = "Independent";
    else
      this.act.triggerEvent = "At";
    this.obj = await this.$ser.getAllObjectsDescription();


    }

  getAllact(a:Activity)
  {var tab;
    for(var i=0; i<this.acts.tabActivities.length; i++)
    {
      
          if((this.acts.tabActivities[i]).dependsActivityName==a.name)
          
          { tab.push(this.acts.tabActivities[i]);
            
          
          }
        }
        return tab;
    
  }

  check()
    {
      var regex = /(([!]{0,1})\s*\(*\s*([!]{0,1})\s*(\s*(\w+\s*(\=|\=|\<|\>|<=|>=|!=)+\s*([!]{0,1})(\w+|\'\w+\')+\s*)|([!]{0,1})\s*\(+\s*([!]{1})\s*\(+\s*(\s*(([!]{0,1})\w+\s*(\=|\=|\<|\>|<=|>=|!=)+\s*([!]{0,1})(\w+|\'\w+\')+\s*)){1})\)*\s*((and|or)\s*\(*\s*[\!]{0,1}\s*\(*((\(*\s*[\!]{0,1}\s*\w+\s*(\=|\=|\<|\>|<=|>=|!=)\s*([!]{0,1})\s*(\w+|\'\w+\')\s*\)*)\s*))*)\)*/;
      var i = 0;
      var b = true;
      var k = this.act.ifCondition;
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
      
   if(this.act.ifCondition.length!=0)
        this.b=b;
      var m = Array.from(this.act.ifCondition);
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
    this.act = new ConditionalActivities();
    form.reset();
    if(this.bpelProcess.processType == "On demande")
      this.act.triggerEvent = "Independent";
    else
      this.act.triggerEvent = "At";  }

  addIfActivity(){
    this.act.ifActivity = new Activity();
    this.ifActivity.operationUri = this.obj.getUriOperation(this.ifActivity.objectName ,this.ifActivity.operationName);
    this.act.ifActivity = this.ifActivity;
    this.ifActivity = new Activity();
  }

  addElseActivity(){
    this.act.elseActivity = new Activity();
    this.elseActivity.operationUri = this.obj.getUriOperation(this.elseActivity.objectName, this.elseActivity.operationName);
    this.act.elseActivity = this.elseActivity;
    this.elseActivity = new Activity();
  }

  deleteConditionalActivity()
  {
    this.act.ifActivity=null;
    this.act.elseActivity=null;
    this.act.ifCondition="";
  }

  addCondition(){
    this.act.ifCondition=this.act.ifCondition+' '+this.cond.objectName+this.cond.attribute+' '+this.cond.operator+' '+this.cond.value;
    this.act.ifConditionAttributs.set(this.cond.objectName+this.cond.attribute, this.obj.getAttributeUriGetter(this.cond.objectName, this.cond.attribute));
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
    return this.act.conditionalActivitiesIsComplete();
  }

  Show()
  {
    if(!this.val)
    this.val=true;
    else 
    this.val=false;
  }  

  ifActActivityNameExist(name:string){
    if(this.ifActivity.type == "Created activity")
      return false;
    if(name != "" && (name == this.act.name || name == this.elseActivity.name))
      return true;
    return this.activityNameExist(name);
  }

  ifActAllFieldsAreWellFilled(){
    if(this.ifActActivityNameExist(this.ifActivity.name) == true)
      return false;
    if(this.ifActivity.name == "")
      return false;
    if(this.ifActivity.type == "New Activity")
      if(this.ifActivity.objectName == "" || this.ifActivity.operationName == "")
        return false;
    return true;
  }

  elseActActivityNameExist(name:string){
    if(this.elseActivity.type == "Created activity")
      return false;
    if(name != "" && (name == this.act.name || name == this.ifActivity.name))
      return true;
    return this.activityNameExist(name);
  }

  elseActAllFieldsAreWellFilled(){
    if(this.ifActActivityNameExist(this.ifActivity.name) == true)
      return false;
    if(this.elseActivity.name == "")
      return false;
    if(this.elseActivity.type == "New Activity")
      if(this.elseActivity.objectName == "" || this.elseActivity.operationName == "")
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
