import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopActivitiesFormComponent } from './loop-activities-form.component';

describe('LoopActivitiesFormComponent', () => {
  let component: LoopActivitiesFormComponent;
  let fixture: ComponentFixture<LoopActivitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopActivitiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopActivitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
