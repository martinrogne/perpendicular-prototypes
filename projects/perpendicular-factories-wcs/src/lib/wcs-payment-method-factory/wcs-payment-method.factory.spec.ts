import { WCSPaymentMethodFactory } from './wcs-payment-method.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import applicablePaymentMethods from './data/applicable-payment-methods-response.json';

describe('WCSPaymentMethodFactory', () => {
  let spectator: SpectatorService<WCSPaymentMethodFactory>;
  const createService = createServiceFactory({
    service: WCSPaymentMethodFactory,
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should be able to deserialize a response from backend', () => {
    const payment = spectator.service.newInstancesFromJSON(applicablePaymentMethods);

    expect(payment.length).toBe(9);
  });
});
