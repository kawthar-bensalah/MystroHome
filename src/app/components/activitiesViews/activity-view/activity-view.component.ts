import { Component, OnInit, Input } from '@angular/core';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { Activities } from 'src/app/models/activities/activities';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { Activity } from 'src/app/models/activities/activity';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements OnInit {

  @Input() act:any;
  b : boolean=false;
  

  moreDetails : boolean = false;
  moreDetailsSubActivities : boolean = false;
  moreDetailsElse : boolean = false;
  acts : Activities;
  act2 : any;

  theme : any;

  constructor(private $service: BpelGeneratorService, private $ser: DataService) { }

  ngOnInit(): void {
    this.theme = this.$ser.theme;
    this.acts = this.$service.getActivities();
   this.b=false;
  }


  getAllact(a:Activity)
  { 
    var tab=[];
    this.b=true;
    for(var i=0; i<this.acts.tabActivities.length; i++)
    {
      
          if((this.acts.tabActivities[i]).dependsActivityName==a.name)
          { tab.push(this.acts.tabActivities[i]);
            
          this.b=false;
          }
    }
    return tab;
  }

  setMoreDetails(){
    this.moreDetails = !this.moreDetails;
  }

  setMoreDetailsSubActivities(){
    this.moreDetailsSubActivities = !this.moreDetailsSubActivities;
  }

  setMoreDetailsElse(){
    this.moreDetailsElse = !this.moreDetailsElse;
  }

  removeActivity(){
   this.$service.removeActivity(this.act.name); 
  }

}
