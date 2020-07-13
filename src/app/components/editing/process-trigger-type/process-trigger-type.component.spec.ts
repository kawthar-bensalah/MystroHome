import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTriggerTypeComponent } from './process-trigger-type.component';

describe('ProcessTriggerTypeComponent', () => {
  let component: ProcessTriggerTypeComponent;
  let fixture: ComponentFixture<ProcessTriggerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTriggerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTriggerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
