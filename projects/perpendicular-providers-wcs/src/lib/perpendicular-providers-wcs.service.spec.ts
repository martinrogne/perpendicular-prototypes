import { TestBed } from '@angular/core/testing';

import { PerpendicularProvidersWcsService } from './perpendicular-providers-wcs.service';

describe('PerpendicularProvidersWcsService', () => {
  let service: PerpendicularProvidersWcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerpendicularProvidersWcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
