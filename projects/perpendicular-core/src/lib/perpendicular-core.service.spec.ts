import { TestBed } from '@angular/core/testing';

import { PerpendicularCoreService } from './perpendicular-core.service';

describe('PerpendicularCoreService', () => {
  let service: PerpendicularCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerpendicularCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
