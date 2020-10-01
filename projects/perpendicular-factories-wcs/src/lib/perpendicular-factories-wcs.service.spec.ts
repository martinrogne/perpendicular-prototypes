import { TestBed } from '@angular/core/testing';

import { PerpendicularFactoriesWcsService } from './perpendicular-factories-wcs.service';

describe('PerpendicularFactoriesWcsService', () => {
  let service: PerpendicularFactoriesWcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerpendicularFactoriesWcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
