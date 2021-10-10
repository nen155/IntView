import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterScoreComponent } from './filter-score.component';

describe('FilterScoreComponent', () => {
  let component: FilterScoreComponent;
  let fixture: ComponentFixture<FilterScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
