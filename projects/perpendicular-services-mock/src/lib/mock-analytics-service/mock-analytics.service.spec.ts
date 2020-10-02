import { TestBed } from '@angular/core/testing';

import { MockAnalyticsService } from './mock-analytics.service';

describe('MockAnalyticsService', () => {
  let service: MockAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
