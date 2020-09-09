import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import {ICartService, IProductFactory, Product} from '@perpendicular/core';
import { OnInputChange } from '../core/decorators/on-input-change-decorator';

/**
 * Directive for easily adding an item to cart by
 * attaching the directive to an element
 */
@Directive({
  selector: '[appAddToCart]'
})
export class AddToCartDirective {
  /**
   * The product that may be added to cart
   */
  @OnInputChange() @Input() product: Product;

  /**
   * Indicator for whether the host element should be enabled
   */
  @HostBinding('disabled') disabled: boolean;


  /**
   * Default constructor
   */
  constructor(public service: ICartService,
              public factory: IProductFactory) {
    this.disabled = true;
    this.product = this.factory.newInstance();
  }

  /**
   * Handler for the click action on an element
   */
  @HostListener('click') onClick(): void {
    this.service.addToCart(this.product.productId, 1);
  }

  /**
   * Handler for when the product input changes
   */
  public productChanged(product: Product): void {
    if (product.type === 'ItemBean') {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

}
