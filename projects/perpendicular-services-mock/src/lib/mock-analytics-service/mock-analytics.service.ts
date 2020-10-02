import { Injectable } from '@angular/core';
import { IAnalyticsService, Order, Product, MarketingContent } from 'perpendicular-core';

/**
 * Mock version of the analytics service. Does not do anything.
 */
@Injectable()
export class MockAnalyticsService implements IAnalyticsService {
  /**
   * See [[IAnalyticsService]]
   */
  constructor() {
    spyOn(this as IAnalyticsService, 'trackMarketingImpressions').and.callThrough();
    spyOn(this as IAnalyticsService, 'trackMarketingContentClick').and.callThrough();
    spyOn(this as IAnalyticsService, 'trackProductImpressions').and.callThrough();
    spyOn(this as IAnalyticsService, 'trackProductClick').and.callThrough();
    spyOn(this as IAnalyticsService, 'trackProductDetailsView').and.callThrough();
    spyOn(this as IAnalyticsService, 'trackAddToCart').and.callThrough();
    spyOn(this as IAnalyticsService, 'trackRemoveFromCart').and.callThrough();
    spyOn(this as IAnalyticsService, 'trackCheckoutStep').and.callThrough();
    spyOn(this as IAnalyticsService, 'trackFinalizedOrder').and.callThrough();
  }
  /**
   * See [[IAnalyticsService]]
   */
  trackMarketingImpressions(items: MarketingContent[], list: string): void {}
  /**
   * See [[IAnalyticsService]]
   */
  trackMarketingContentClick(content: MarketingContent, list: string, position: number): void {}
  /**
   * See [[IAnalyticsService]]
   */
  trackProductImpressions(productIds: string[] | Product[], list: string): void {}

  /**
   * See [[IAnalyticsService]]
   */
  trackProductClick(productId: string | Product, list: string, position: number): void {}

  /**
   * See [[IAnalyticsService]]
   */
  trackProductDetailsView(productId: string | Product): void {}

  /**
   * See [[IAnalyticsService]]
   */
  trackAddToCart(productId: string[] | Product[], quantity: number[]): void {}

  /**
   * See [[IAnalyticsService]]
   */
  trackRemoveFromCart(productId: string | Product, quantity: number): void {}

  /**
   * See [[IAnalyticsService]]
   */
  trackCheckoutStep(step: number, option: string): void {}

  /**
   * See [[IAnalyticsService]]
   */
  trackFinalizedOrder(order: Order): void {}
}
