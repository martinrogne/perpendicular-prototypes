import { Spectator, createRoutingFactory } from '@ngneat/spectator';

import { ProductPageComponent } from './product-page.component';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';

describe('ProductPageComponent', () => {
  let spectator: Spectator<ProductPageComponent>;
  const createComponent = createRoutingFactory({
    component: ProductPageComponent,
    imports: [
      WCSProductFactoryModule
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
