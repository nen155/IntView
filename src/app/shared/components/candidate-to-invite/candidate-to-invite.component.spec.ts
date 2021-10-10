import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateToInviteComponent } from './candidate-to-invite.component';

describe('CandidateToInviteComponent', () => {
  let component: CandidateToInviteComponent;
  let fixture: ComponentFixture<CandidateToInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateToInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateToInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
