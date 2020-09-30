import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { ProductPageComponent } from './product-page.component';

describe('ProductPageComponent', () => {
  let spectator: Spectator<ProductPageComponent>;
  const createComponent = createComponentFactory(ProductPageComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
