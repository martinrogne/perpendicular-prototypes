import { Directive, HostListener, Input } from '@angular/core';
import { CartItem, ICartFactory, ICartService } from 'perpendicular-core';

@Directive({
  selector: '[libCartRemove]'
})
export class CartRemoveDirective {
  /**
   * The item which may be removed from cart
   */
  @Input() item: CartItem;

  /**
   * Default constructor
   */
  constructor(public service: ICartService,
              public factory: ICartFactory) {
    this.item = new CartItem();
  }

  /**
   * Handler for the click action on an element
   */
  @HostListener('click') onClick(): void {
    this.service.removeFromCart(this.item);
  }
}
