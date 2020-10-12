import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartItemComponent } from './cart-item/cart-item.component';
import { DirectivesModule } from '../directives/directives.module';
import { CartRemoveDirectiveModule, CartQuantityDirectiveModule } from 'perpendicular-directives';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ShippingMethodComponent } from './shipping-method/shipping-method.component';


/**
 * Module for all lazy-loaded checkout functionality
 */
@NgModule({
  declarations: [
    CheckoutPageComponent,
    CartItemComponent,
    CheckoutAddressComponent,
    PaymentMethodComponent,
    ShippingMethodComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckoutRoutingModule,
    DirectivesModule,
    CartRemoveDirectiveModule,
    CartQuantityDirectiveModule,
  ]
})
export class CheckoutModule { }
