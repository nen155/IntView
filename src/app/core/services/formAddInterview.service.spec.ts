import { TestBed } from '@angular/core/testing';

import { FormAddInterviewService } from './formAddInterview.service';

describe('FormService', () => {
  let service: FormAddInterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormAddInterviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
