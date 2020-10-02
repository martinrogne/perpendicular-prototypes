import { MockProduct } from './mock-product.registry';

describe('MockProduct', () => {
  it('should create an instance', () => {
    expect(new MockProduct()).toBeTruthy();
  });
});
