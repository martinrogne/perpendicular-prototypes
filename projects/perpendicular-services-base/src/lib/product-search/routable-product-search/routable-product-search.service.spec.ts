import { TestBed } from '@angular/core/testing';

import { RoutableProductSearchService } from './routable-product-search.service';

xdescribe('RoutableProductSearchService', () => {
  let service: RoutableProductSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutableProductSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
