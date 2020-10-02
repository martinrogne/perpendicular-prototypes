import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ProductTileComponent } from './product-tile.component';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';

describe('ProductTileComponent', () => {
  let spectator: Spectator<ProductTileComponent>;
  const createComponent = createComponentFactory({
    component: ProductTileComponent,
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
