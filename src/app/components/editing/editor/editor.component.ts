import { Component, OnInit } from '@angular/core';
import { Activities } from 'src/app/models/activities/activities';
import { bpelGenerator } from 'src/app/models/bpelProcess/bpelGenerator';
import { BpelGeneratorService } from 'src/app/services/bpel-generator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  acts: Activities;
  bpelProcess: bpelGenerator;

  formActivityType: number = 1;
  Show : string;

  constructor(private $service: BpelGeneratorService, private $router: Router) { }

  ngOnInit(): void {
    this.acts = this.$service.getActivities();
    this.bpelProcess = this.$service.getBpelProcess();
    if(!this.bpelProcess.hasProcessName())
    {
      this.$router.navigate(['../main/editing/myScenarios']);
    }
    this.Show="all";
  }

  setFormActivityType(val: number) {
    this.formActivityType = val;
  }

  ShowForms()
  {
    if(this.Show != '1')
    this.Show='1';
    else
    this.Show='all';
  }

  ShowScenario()
  {
    if(this.Show != '2')
    this.Show='2';
    else
    this.Show='all';
  }

  exit(){
    this.$service.reset();
  }

}
