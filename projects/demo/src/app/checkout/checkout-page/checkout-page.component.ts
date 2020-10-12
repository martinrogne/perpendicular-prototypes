import { Component, Injector, OnInit } from '@angular/core';
import { Cart, IAnalyticsService, ICartService, PaymentMethod, ShippingMode, } from 'perpendicular-core';
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
   * The list of applicable payment methods for the order
   */
  public paymentMethods: Array<PaymentMethod> = [];

  /**
   * The list of applicable shipping modes for the order
   */
  public shippingModes: Array<ShippingMode> = [];


  /**
   * Default constructor
   */
  constructor(public analytics: IAnalyticsService,
              public cartService: ICartService,
              public injector: Injector) {
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
    this.analytics.trackCheckoutStep(1, 'Cart');

    this.cartService.state.subscribe(x => {
      this.cartService.getAllowedShippingModes().then(z => {
        this.shippingModes = z;
      });

      this.cartService.getAllowedPaymentInfo().then(z => {
        this.paymentMethods = z;
      });
    });
  }

  public selectPaymentMethod(paymentMethod: PaymentMethod): void {

  }

  public selectShippingMode(shippingMode: ShippingMode): void {

  }
}
