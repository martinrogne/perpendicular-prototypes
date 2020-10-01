import { TestBed } from '@angular/core/testing';

import { PerpendicularServicesMockService } from './perpendicular-services-mock.service';

describe('PerpendicularServicesMockService', () => {
  let service: PerpendicularServicesMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerpendicularServicesMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
