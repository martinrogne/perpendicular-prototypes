import { TestBed } from '@angular/core/testing';

import { MockIdentityService } from './mock-identity.service';

describe('MockIdentityService', () => {
  let service: MockIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
