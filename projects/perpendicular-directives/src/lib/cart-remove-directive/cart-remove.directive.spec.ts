import { CartRemoveDirective } from './cart-remove.directive';
import { createDirectiveFactory, mockProvider, SpectatorDirective } from '@ngneat/spectator';
import {
  WCSAddressFactoryModule,
  WCSCartFactoryModule,
  WCSPaymentInstructionFactoryModule,
  WCSShippingModeFactoryModule
} from 'perpendicular-factories-wcs';
import { Cart, ICartService, ProvidersWCSConfig } from 'perpendicular-core';
import { CartService } from 'perpendicular-services-base';
import { BehaviorSubject } from 'rxjs';

describe('CartRemoveDirective', () => {
  let spectator: SpectatorDirective<CartRemoveDirective>;
  const createDirective = createDirectiveFactory({
    directive: CartRemoveDirective,
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
    spectator = createDirective(`<button libCartRemove>Add</button>`);
  });


  it('should create an instance', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should call the cart service to remove from cart', () => {
    spectator.click();

    expect(spectator.directive.service.removeFromCart).toHaveBeenCalledTimes(1);
    expect(spectator.directive.service.removeFromCart).toHaveBeenCalledWith(spectator.directive.item);
  });
});
