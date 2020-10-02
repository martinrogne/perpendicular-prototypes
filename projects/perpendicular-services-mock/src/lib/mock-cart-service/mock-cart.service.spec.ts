import { TestBed } from '@angular/core/testing';

import { MockCartService } from './mock-cart.service';

describe('MockCartService', () => {
  let service: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
