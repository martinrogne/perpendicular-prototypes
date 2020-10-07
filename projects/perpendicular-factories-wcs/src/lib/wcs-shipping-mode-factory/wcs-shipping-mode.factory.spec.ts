import { WCSShippingModeFactory } from './wcs-shipping-mode.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('WCSShippingModeFactory', () => {
  let spectator: SpectatorService<WCSShippingModeFactory>;
  const createService = createServiceFactory({
    service: WCSShippingModeFactory,
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });
});
