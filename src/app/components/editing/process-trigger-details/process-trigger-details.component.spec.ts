import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTriggerDetailsComponent } from './process-trigger-details.component';

describe('ProcessTriggerDetailsComponent', () => {
  let component: ProcessTriggerDetailsComponent;
  let fixture: ComponentFixture<ProcessTriggerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTriggerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTriggerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
