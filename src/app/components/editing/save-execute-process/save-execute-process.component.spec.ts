import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveExecuteProcessComponent } from './save-execute-process.component';

describe('SaveExecuteProcessComponent', () => {
  let component: SaveExecuteProcessComponent;
  let fixture: ComponentFixture<SaveExecuteProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveExecuteProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveExecuteProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
