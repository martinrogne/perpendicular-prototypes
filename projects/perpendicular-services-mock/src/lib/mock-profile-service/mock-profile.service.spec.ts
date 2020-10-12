import { TestBed } from '@angular/core/testing';

import { MockProfileService } from './mock-profile.service';

describe('MockProfileService', () => {
  let service: MockProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
