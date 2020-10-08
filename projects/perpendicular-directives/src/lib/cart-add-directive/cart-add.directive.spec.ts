import { CartAddDirective } from './cart-add.directive';
import { createDirectiveFactory, mockProvider, SpectatorDirective } from '@ngneat/spectator';
import { CartService } from 'perpendicular-services-base';
import { BehaviorSubject } from 'rxjs';
import { Cart, ICartService, ProvidersWCSConfig } from 'perpendicular-core';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';

describe('CartAddDirective', () => {
  let spectator: SpectatorDirective<CartAddDirective>;
  const createDirective = createDirectiveFactory({
    directive: CartAddDirective,
    imports: [
      WCSProductFactoryModule
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
    spectator = createDirective(`<button libCartAdd>Add</button>`);
    spectator.directive.product = spectator.directive.factory.newInstance();
    spectator.directive.product.productId = 'P1000';
  });


  it('should create an instance', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should call the cart service to add to cart', () => {
    spectator.click();

    expect(spectator.directive.service.addToCart).toHaveBeenCalledTimes(1);
    expect(spectator.directive.service.addToCart).toHaveBeenCalledWith('P1000', 1);
  });
});
