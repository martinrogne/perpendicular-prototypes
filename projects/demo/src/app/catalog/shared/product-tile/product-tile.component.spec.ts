import { Spectator, createRoutingFactory } from '@ngneat/spectator';
import { ProductTileComponent } from './product-tile.component';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';
import { MockDirective } from 'ng-mocks';
import { AddToCartDirective } from '../../../directives/add-to-cart.directive';

describe('ProductTileComponent', () => {
  let spectator: Spectator<ProductTileComponent>;
  const createComponent = createRoutingFactory({
    component: ProductTileComponent,
    declarations: [
      MockDirective(AddToCartDirective),
    ],
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
