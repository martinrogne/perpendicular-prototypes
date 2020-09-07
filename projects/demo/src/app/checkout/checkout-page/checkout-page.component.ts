import { Component, OnInit } from '@angular/core';
import { Cart, ICartFactory, ICartService } from '@perpendicular/core';
import {debounceTime, filter} from 'rxjs/operators';

/**
 * Component for rendering the checkout page
 */
@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  /**
   * The cart to be rendered
   */
  public cart: Cart;


  /**
   * Default constructor
   */
  constructor(public service: ICartService,
              public factory: ICartFactory) {
    this.cart = this.factory.newInstance();
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
    this.service.state.subscribe(x => {
      this.cart = x;
    });
  }
}
