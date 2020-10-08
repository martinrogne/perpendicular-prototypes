import { CartQuantityDirective } from './cart-quantity.directive';
import { createDirectiveFactory, mockProvider, SpectatorDirective } from '@ngneat/spectator';
import { Cart, ICartService, ProvidersWCSConfig } from 'perpendicular-core';
import { CartService } from 'perpendicular-services-base';
import { BehaviorSubject } from 'rxjs';
import {
  WCSAddressFactoryModule,
  WCSCartFactoryModule,
  WCSPaymentInstructionFactoryModule,
  WCSShippingModeFactoryModule
} from 'perpendicular-factories-wcs';

describe('CartQuantityDirective', () => {
  let spectator: SpectatorDirective<CartQuantityDirective>;
  const createDirective = createDirectiveFactory({
    directive: CartQuantityDirective,
    imports: [
      WCSCartFactoryModule,
      WCSShippingModeFactoryModule,
      WCSAddressFactoryModule,
      WCSPaymentInstructionFactoryModule
    ],
    providers: [
      ProvidersWCSConfig,
      mockProvider(CartService, {
        state: new BehaviorSubject(new Cart())
      }),

      { provide: ICartService, useExisting: CartService }
    ]
  });

  beforeEach(() => {
    spectator = createDirective(`<input libCartQuantity />`);
    spectator.directive.item.lineId = 'I1000';
  });


  it('should create an instance', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should call the cart service to change quantity', () => {
    spectator.typeInElement('5', 'input');
    const input = spectator.query('input');

    if (input) {
      input.dispatchEvent(new Event('change'));
    }

    expect(spectator.directive.service.adjustQuantity).toHaveBeenCalledTimes(1);
    expect(spectator.directive.service.adjustQuantity).toHaveBeenCalledWith(spectator.directive.item, 5);
  });
});
