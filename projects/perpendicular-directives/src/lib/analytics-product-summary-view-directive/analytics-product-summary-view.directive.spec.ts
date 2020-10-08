import { AnalyticsProductSummaryViewDirective } from './analytics-product-summary-view.directive';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { MockAnalyticsServiceModule } from 'perpendicular-services-mock';
import { WCSProduct } from 'perpendicular-models-wcs';

describe('AnalyticsProductSummaryViewDirective', () => {
  let spectator: SpectatorDirective<AnalyticsProductSummaryViewDirective>;
  const createDirective = createDirectiveFactory({
    directive: AnalyticsProductSummaryViewDirective,
    imports: [
      MockAnalyticsServiceModule
    ]
  });

  beforeEach(() => {
    spectator = createDirective(`<div libAnalyticsProductSummaryView>Product</div>`);
  });


  it('should create an instance', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('will call the service when the product is set', () => {
    const product = new WCSProduct();
    const indices = new Map<string, number>();
    indices.set('P1000', 5);
    product.productId = 'P1000';

    spectator.setInput('list', 'search');
    spectator.setInput('index', 5);
    spectator.setInput('product', product);
    spectator.click('div');

    expect(spectator.directive.analyticsService.trackProductImpressions).toHaveBeenCalledTimes(1);
    expect(spectator.directive.analyticsService.trackProductImpressions).toHaveBeenCalledWith([product], 'search', indices);
  });

  it('will call the service again when the product input changes', () => {
    const product = new WCSProduct();
    const indices = new Map<string, number>();
    indices.set('P1000', 5);
    product.productId = 'P1000';

    spectator.setInput('list', 'search');
    spectator.setInput('index', 5);
    spectator.setInput('product', product);

    expect(spectator.directive.analyticsService.trackProductImpressions).toHaveBeenCalledTimes(1);
    expect(spectator.directive.analyticsService.trackProductImpressions).toHaveBeenCalledWith([product], 'search', indices);

    const productChanged = new WCSProduct();
    const indicesChanged = new Map<string, number>();
    indicesChanged.set('P1001', 5);
    productChanged.productId = 'P1001';

    spectator.setInput('product', productChanged);

    expect(spectator.directive.analyticsService.trackProductImpressions).toHaveBeenCalledTimes(2);
    expect(spectator.directive.analyticsService.trackProductImpressions).toHaveBeenCalledWith([productChanged], 'search', indicesChanged);
  });
});
