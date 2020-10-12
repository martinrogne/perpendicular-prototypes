import { Spectator, createRoutingFactory } from '@ngneat/spectator';
import { ProductTileComponent } from './product-tile.component';
import {
  WCSAddressFactoryModule,
  WCSCartFactoryModule,
  WCSPaymentInstructionFactoryModule,
  WCSPaymentMethodFactoryModule,
  WCSProductFactoryModule,
  WCSShippingModeFactoryModule
} from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';
import { CartAddDirectiveModule } from 'perpendicular-directives';
import { MockCartServiceModule } from 'perpendicular-services-mock';

describe('ProductTileComponent', () => {
  let spectator: Spectator<ProductTileComponent>;
  const createComponent = createRoutingFactory({
    component: ProductTileComponent,
    declarations: [
    ],
    imports: [
      MockCartServiceModule,
      CartAddDirectiveModule,
      WCSProductFactoryModule,
      WCSCartFactoryModule,
      WCSShippingModeFactoryModule,
      WCSPaymentInstructionFactoryModule,
      WCSPaymentMethodFactoryModule,
      WCSAddressFactoryModule
    ],
    providers: [
      ProvidersWCSConfig
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
