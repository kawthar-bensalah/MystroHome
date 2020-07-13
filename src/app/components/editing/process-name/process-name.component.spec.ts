import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessNameComponent } from './process-name.component';

describe('ProcessNameComponent', () => {
  let component: ProcessNameComponent;
  let fixture: ComponentFixture<ProcessNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
