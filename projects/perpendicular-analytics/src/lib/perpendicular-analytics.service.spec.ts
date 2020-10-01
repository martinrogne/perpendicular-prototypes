import { TestBed } from '@angular/core/testing';

import { PerpendicularAnalyticsService } from './perpendicular-analytics.service';

describe('PerpendicularAnalyticsService', () => {
  let service: PerpendicularAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerpendicularAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
