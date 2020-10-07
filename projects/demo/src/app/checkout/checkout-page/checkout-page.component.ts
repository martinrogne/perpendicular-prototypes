import { Component, Injector, OnInit } from '@angular/core';
import {
  Cart, CartItem,
  IAnalyticsService,
  ICartService,
} from 'perpendicular-core';
import { ServiceStateBind } from '../../core/decorators/service-state-bind-decorator';

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
  @ServiceStateBind(ICartService) public cart: Cart | undefined;


  /**
   * Default constructor
   */
  constructor(public analytics: IAnalyticsService,
              public injector: Injector) {
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
    this.analytics.trackCheckoutStep(1, 'Cart');
  }
}
