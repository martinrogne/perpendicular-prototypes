import { CheckoutAddressComponent } from './checkout-address.component';
import { createRoutingFactory, Spectator } from '@ngneat/spectator';
import { WCSAddressFactoryModule } from 'perpendicular-factories-wcs';
import { MockProfileServiceModule } from 'perpendicular-services-mock';
import { ReactiveFormsModule } from '@angular/forms';

describe('CheckoutAddressComponent', () => {
  let spectator: Spectator<CheckoutAddressComponent>;
  const createComponent = createRoutingFactory({
    component: CheckoutAddressComponent,
    imports: [
      ReactiveFormsModule,
      WCSAddressFactoryModule,
      MockProfileServiceModule
    ],
    declarations: [
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
