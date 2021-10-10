import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewProgressComponent } from './interview-progress.component';

describe('InterviewProgressComponent', () => {
  let component: InterviewProgressComponent;
  let fixture: ComponentFixture<InterviewProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
