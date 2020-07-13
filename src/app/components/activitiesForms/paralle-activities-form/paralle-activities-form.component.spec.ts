import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParalleActivitiesFormComponent } from './paralle-activities-form.component';

describe('ParalleActivitiesFormComponent', () => {
  let component: ParalleActivitiesFormComponent;
  let fixture: ComponentFixture<ParalleActivitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParalleActivitiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParalleActivitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
