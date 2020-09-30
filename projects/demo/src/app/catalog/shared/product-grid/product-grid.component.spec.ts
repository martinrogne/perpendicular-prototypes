import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProductGridComponent } from './product-grid.component';

describe('ProductGridComponent', () => {
  let spectator: Spectator<ProductGridComponent>;
  const createComponent = createComponentFactory(ProductGridComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
