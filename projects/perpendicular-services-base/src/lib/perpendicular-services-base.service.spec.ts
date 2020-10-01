import { TestBed } from '@angular/core/testing';

import { PerpendicularServicesBaseService } from './perpendicular-services-base.service';

describe('PerpendicularServicesBaseService', () => {
  let service: PerpendicularServicesBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerpendicularServicesBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
