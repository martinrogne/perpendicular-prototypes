import { TestBed } from '@angular/core/testing';

import { MockCookieService } from './mock-cookie.service';

describe('MockCookieService', () => {
  let service: MockCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
