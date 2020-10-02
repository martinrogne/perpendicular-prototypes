import { TestBed } from '@angular/core/testing';

import { MockNotificationService } from './mock-notification.service';

xdescribe('MockNotificationService', () => {
  let service: MockNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
