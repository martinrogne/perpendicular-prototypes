import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ProductGridComponent } from './product-grid.component';
import { ProductTileComponent } from '../product-tile/product-tile.component';
import { MockComponent } from 'ng-mocks';

describe('ProductGridComponent', () => {
  let spectator: Spectator<ProductGridComponent>;
  const createComponent = createComponentFactory({
    component: ProductGridComponent,
    declarations: [
      MockComponent(ProductTileComponent)
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
