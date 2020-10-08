import { Directive, Input } from '@angular/core';
import { IAnalyticsService, Product, OnInputChange } from 'perpendicular-core';

@Directive({
  selector: '[libAnalyticsProductSummaryView]'
})
export class AnalyticsProductSummaryViewDirective {
  /**
   * The product to track
   */
  @OnInputChange() @Input() product: Product | undefined;

  /**
   * The list that the product is being shown in
   */
  @Input() list: string | undefined;

  /**
   * The position of the product within the list
   */
  @Input() index: number | undefined;

  /**
   * Default constructor
   */
  constructor(public analyticsService: IAnalyticsService) { }

  /**
   * Handler for when the product input changes
   */
  public productChanged(product: Product): void {
    if (this.product && this.list && this.index !== undefined) {
      const index = new Map<string, number>();

      if (this.product.productId !== undefined) {
        index.set(product.productId || '', this.index);

        this.analyticsService.trackProductImpressions([product], this.list, index);
      }
    }
  }
}
