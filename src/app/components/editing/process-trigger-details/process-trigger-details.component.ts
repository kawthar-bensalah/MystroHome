import { Component, OnInit } from '@angular/core';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process-trigger-details',
  templateUrl: './process-trigger-details.component.html',
  styleUrls: ['./process-trigger-details.component.scss']
})
export class ProcessTriggerDetailsComponent implements OnInit {

  detailsType : string = "LoopHours";
  detailsTypeValue : any = 1;  
  bpelProcess : bpelGenerator;

  //For Dates
  year : number = 2020;
  month : number = 0;
  monthTab = [
              "January", "February", "March", "April", 
              "May", "June", "July", "August", 
              "September", "October", "November", "December"
             ];

  

  constructor(private $service: BpelGeneratorService, private $router: Router) { }

  ngOnInit(): void {
    this.bpelProcess = this.$service.getBpelProcess();
    if(!this.bpelProcess.hasProcessName())
    {
      this.$router.navigate(['../main/editing/myScenarios']);
    }
  }

  dayClick(day:string)
  {
    if (!this.detailsTypeValue.includes(day))
      this.detailsTypeValue += " " + day;
    else
      this.detailsTypeValue = this.detailsTypeValue.split(day).join("");
  }

  addProcessTriggerDetails(){
    this.bpelProcess.triggerDetailsData=this.detailsTypeValue;
    this.bpelProcess.triggerDetailsType = this.detailsType;
    this.bpelProcess.addProcessDetails();
  }

  //For Dates
  monthNumber(){
    var m = this.month+1;
    if(m<10)
      return "0"+m;
    else
      return m;
  }

  addNewDate(day:string){
    this.detailsTypeValue += " "+this.year+"-"+this.monthNumber()+"-"+day;
  }

  detailsValueUpDown(type:string){
    switch(type){
      case "Up": 
        this.detailsTypeValue++; 
        break;
      case "Down": 
        if (this.detailsTypeValue>1)
          this.detailsTypeValue--; 
        break;
    }
  }

  triggerTypeInit(triggerType:string){
    switch(triggerType){
      case "LoopHours" : 
        this.detailsType = "LoopHours";
        this.detailsTypeValue = 1;
        break;
      case "LoopDays" : 
        this.detailsType = "LoopDays";
        this.detailsTypeValue = 1;
        break;
      case "Days" : 
        this.detailsType = "Days";
        this.detailsTypeValue = "";
        break;
      case "Dates" : 
        this.detailsType = "Dates";
        this.detailsTypeValue = "";
        break;
    }
  }

}
