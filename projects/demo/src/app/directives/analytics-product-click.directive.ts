import { Directive, HostListener, Input } from '@angular/core';
import { IAnalyticsService, Product } from 'perpendicular-core';

/**
 * Directive to handle registering the analytics event
 * when a product is clicked
 */
@Directive({
  selector: '[appAnalyticsProductClick]'
})
export class AnalyticsProductClickDirective {
  /**
   * The product to track
   */
  @Input() product: Product | undefined;

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
  constructor(public service: IAnalyticsService) { }

  /**
   * Handler for the click action on an element
   */
  @HostListener('click') onClick(): void {
    if (this.product && this.list && this.index !== undefined) {
      this.service.trackProductClick(this.product, this.list, this.index);
    }
  }

}
