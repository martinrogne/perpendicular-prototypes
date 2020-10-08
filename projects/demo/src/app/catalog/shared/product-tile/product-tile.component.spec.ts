import { Spectator, createRoutingFactory } from '@ngneat/spectator';
import { ProductTileComponent } from './product-tile.component';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';
import { CartAddDirectiveModule } from 'perpendicular-directives';

describe('ProductTileComponent', () => {
  let spectator: Spectator<ProductTileComponent>;
  const createComponent = createRoutingFactory({
    component: ProductTileComponent,
    declarations: [
    ],
    imports: [
      WCSProductFactoryModule,
      CartAddDirectiveModule
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
