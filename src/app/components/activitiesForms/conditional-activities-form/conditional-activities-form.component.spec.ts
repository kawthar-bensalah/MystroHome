import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalActivitiesFormComponent } from './conditional-activities-form.component';

describe('ConditionalActivitiesFormComponent', () => {
  let component: ConditionalActivitiesFormComponent;
  let fixture: ComponentFixture<ConditionalActivitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionalActivitiesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalActivitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
