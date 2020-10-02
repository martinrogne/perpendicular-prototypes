import { TestBed } from '@angular/core/testing';

import { MockProductSearchService } from './mock-product-search.service';

describe('MockProductSearchService', () => {
  let service: MockProductSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockProductSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
