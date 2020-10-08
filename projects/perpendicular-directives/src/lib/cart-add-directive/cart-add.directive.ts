import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { ICartService, IProductFactory, Product } from 'perpendicular-core';

@Directive({
  selector: '[libCartAdd]'
})
export class CartAddDirective {
  /**
   * The product that may be added to cart
   */
  @Input() product: Product;


  /**
   * Default constructor
   */
  constructor(public service: ICartService,
              public factory: IProductFactory) {
    this.product = this.factory.newInstance();
  }

  /**
   * Handler for the click action on an element
   */
  @HostListener('click') onClick(): void {
    if (this.product.productId) {
      this.service.addToCart(this.product.productId, 1);
    }
  }
}
