import { WCSShippingModeFactory } from './wcs-shipping-mode.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import applicableShippingModes from './data/applicable-shipping-modes-response.json';

describe('WCSShippingModeFactory', () => {
  let spectator: SpectatorService<WCSShippingModeFactory>;
  const createService = createServiceFactory({
    service: WCSShippingModeFactory,
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should be able to deserialize a response from backend', () => {
    const payment = spectator.service.newInstancesFromJSON(applicableShippingModes);

    expect(payment.length).toBe(3);
  });
});
