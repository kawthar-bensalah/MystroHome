import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyObjectComponent } from './my-object.component';

describe('MyObjectComponent', () => {
  let component: MyObjectComponent;
  let fixture: ComponentFixture<MyObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
