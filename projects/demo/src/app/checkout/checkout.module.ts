import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartItemComponent } from './cart-item/cart-item.component';


/**
 * Module for all lazy-loaded checkout functionality
 */
@NgModule({
  declarations: [
    CheckoutPageComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
