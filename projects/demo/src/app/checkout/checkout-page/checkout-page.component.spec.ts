import { Spectator, createComponentFactory, mockProvider } from '@ngneat/spectator';
import { ICartService, ICartFactory, IProfileService, IAddressFactory, IPaymentInstructionFactory, IAnalyticsService, Cart } from 'perpendicular-core';
import { CartService, AnalyticsService } from 'perpendicular-services-base';
import { BehaviorSubject } from 'rxjs';

import { CheckoutPageComponent } from './checkout-page.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { MockComponent } from 'ng-mocks';
import { CheckoutAddressComponent } from '../checkout-address/checkout-address.component';
import { PaymentMethodComponent } from '../payment-method/payment-method.component';
import { ShippingMethodComponent } from '../shipping-method/shipping-method.component';

describe('CheckoutPageComponent', () => {
  let spectator: Spectator<CheckoutPageComponent>;
  const createComponent = createComponentFactory( {
    component: CheckoutPageComponent,
    declarations: [
      MockComponent(CartItemComponent),
      MockComponent(CheckoutAddressComponent),
      MockComponent(PaymentMethodComponent),
      MockComponent(ShippingMethodComponent)
    ],
    providers: [
      mockProvider(CartService, {
        state: new BehaviorSubject(new Cart())
      }),
      mockProvider(AnalyticsService),

      { provide: ICartService, useExisting: CartService },
      { provide: ICartFactory, useExisting: undefined },
      { provide: IProfileService, useValue: undefined },
      { provide: IAddressFactory, useValue: undefined },
      { provide: IPaymentInstructionFactory, useValue: undefined },
      { provide: IAnalyticsService, useExisting: AnalyticsService }
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
