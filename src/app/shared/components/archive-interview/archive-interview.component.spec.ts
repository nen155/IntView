import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveInterviewComponent } from './archive-interview.component';

describe('ArchiveInterviewComponent', () => {
  let component: ArchiveInterviewComponent;
  let fixture: ComponentFixture<ArchiveInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
