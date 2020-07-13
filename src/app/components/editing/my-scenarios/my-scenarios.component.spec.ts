import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScenariosComponent } from './my-scenarios.component';

describe('MyScenariosComponent', () => {
  let component: MyScenariosComponent;
  let fixture: ComponentFixture<MyScenariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyScenariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
