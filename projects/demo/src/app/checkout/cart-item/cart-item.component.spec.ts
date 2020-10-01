import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let spectator: Spectator<CartItemComponent>;
  const createComponent = createComponentFactory(CartItemComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
