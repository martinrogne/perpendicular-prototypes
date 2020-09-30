import { Component, OnInit } from '@angular/core';
import {
  Cart,
  IAddressFactory,
  IAnalyticsService,
  ICartFactory,
  ICartService,
  IPaymentInstructionFactory,
  IProfileService
} from 'perpendicular-core';
import { debounceTime, filter, first } from 'rxjs/operators';

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
  public cart: Cart = new Cart();


  /**
   * Default constructor
   */
  constructor(public service: ICartService,
              public profileService: IProfileService,
              public addressFactory: IAddressFactory,
              public paymentInstructionFactory: IPaymentInstructionFactory,
              public analytics: IAnalyticsService) {
  }

  /**
   * Angular lifecycle hook
   */
  ngOnInit(): void {
    this.service.state.subscribe(x => {
      this.cart = x;
    });

    this.analytics.trackCheckoutStep(1, 'Cart');
  }

  /**
   * Simple one-step checkout function to be able to perform a checkout - just to verify Google Analytics
   */
  public async doCheckout(): Promise<void> {
    this.service.clearPaymentInstructions();

    const c1 = await this.service.state.pipe(filter(x => x.paymentInstructions.length === 0), first()).toPromise();

    const address = this.addressFactory.newInstance();
    address.isBillingAddress = true;
    address.isBillingAddress = true;
    address.nickName = new Date().toISOString();
    address.address1 = 'Foo Lane';
    address.city = 'Foo City';
    address.country = 'Foo country';

    this.profileService.saveAddress(address);

    const profile = await this.profileService.state.pipe(filter(x => x.addressBook.length > 0), first()).toPromise();
    const shipping = await this.service.getAllowedShippingModes();
    const payment = await this.service.getAllowedPaymentInfo();

    await this.service.setBillingAddress(profile.addressBook[0]);
    await this.service.setShippingAddress(profile.addressBook[0]);

    const c2 = await this.service.state.pipe(filter(x => x.paymentInstructions.length > 0), first()).toPromise();

    const payLater = payment.find(x => x.paymentMethodName === 'PayLater');
    if (payLater) {
      this.service.setPaymentMethod(payLater);

      const c3 = await this.service.state.pipe(
        filter(x => x.paymentInstructions.length > 0 && x.paymentInstructions[0].paymentMethodName === 'PayLater'),
        first()).toPromise();

      const order = await this.service.checkout();

      this.analytics.trackFinalizedOrder(order);
    }
  }
}
