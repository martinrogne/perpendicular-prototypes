import { WCSCartFactory } from './wcs-cart.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { IAddressFactory, IPaymentInstructionFactory, IShippingModeFactory, ProvidersWCSConfig } from 'perpendicular-core';
import { WCSAddressFactory } from '../wcs-address-factory/wcs-address.factory';
import { WCSShippingModeFactory } from '../wcs-shipping-mode-factory/wcs-shipping-mode.factory';
import { WCSPaymentInstructionFactory } from '../wcs-payment-instruction-factory/wcs-payment-instruction.factory';

import single from './data/cart-single-response.json';
import multiple from './data/cart-multiple-response.json';

describe('WCSCartFactory', () => {
  let spectator: SpectatorService<WCSCartFactory>;
  const createService = createServiceFactory({
    service: WCSCartFactory,
    mocks: [
      ProvidersWCSConfig,
      WCSAddressFactory,
      WCSShippingModeFactory,
      WCSPaymentInstructionFactory
    ],
    providers: [
      { provide: IAddressFactory, useExisting: WCSAddressFactory },
      { provide: IShippingModeFactory, useExisting: WCSShippingModeFactory },
      { provide: IPaymentInstructionFactory, useExisting: WCSPaymentInstructionFactory }
    ]
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('single item cart', () => {
    it('should be able to deserialize a cart entity from JSON', () => {
      const cart = spectator.service.newInstanceFromJSON(single);

      expect(cart.id).toBe('161488187713');
      expect(cart.items.length).toBe(1);
    });

    xit('should verify the origin of the object being server', () => {

    });

    xit('should verify that an invalid response returns a placeholder', () => {

    });
  });

  describe('multiple item cart', () => {
    it('should be able to deserialize a cart entity from JSON', () => {
      const cart = spectator.service.newInstanceFromJSON(multiple);

      expect(cart.id).toBe('161488187713');
      expect(cart.items.length).toBe(2);
    });

    xit('should verify the origin of the object being server', () => {

    });

    xit('should verify that an invalid response returns a placeholder', () => {

    });
  });
});
