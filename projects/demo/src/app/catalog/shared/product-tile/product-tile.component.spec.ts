import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProductTileComponent } from './product-tile.component';

describe('ProductTileComponent', () => {
  let spectator: Spectator<ProductTileComponent>;
  const createComponent = createComponentFactory(ProductTileComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
