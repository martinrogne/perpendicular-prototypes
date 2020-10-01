import { TestBed } from '@angular/core/testing';

import { PerpendicularModelsWcsService } from './perpendicular-models-wcs.service';

describe('PerpendicularModelsWcsService', () => {
  let service: PerpendicularModelsWcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerpendicularModelsWcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
