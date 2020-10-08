import { AnalyticsProductClickDirective } from './analytics-product-click.directive';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { MockAnalyticsServiceModule } from 'perpendicular-services-mock';
import { WCSProduct } from 'perpendicular-models-wcs';

describe('AnalyticsProductClickDirective', () => {
  let spectator: SpectatorDirective<AnalyticsProductClickDirective>;
  const createDirective = createDirectiveFactory({
    directive: AnalyticsProductClickDirective,
    imports: [
      MockAnalyticsServiceModule
    ]
  });

  beforeEach(() => {
    spectator = createDirective(`<div libAnalyticsProductClick>Product</div>`);
  });


  it('should create an instance', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('will call the analytics service when the product is clicked', () => {
    const product = new WCSProduct();
    product.productId = 'P1000';

    spectator.setInput('list', 'search');
    spectator.setInput('index', 5);
    spectator.setInput('product', product);
    spectator.click('div');

    expect(spectator.directive.service.trackProductClick).toHaveBeenCalledTimes(1);
    expect(spectator.directive.service.trackProductClick).toHaveBeenCalledWith(product, 'search', 5);
  });
});
