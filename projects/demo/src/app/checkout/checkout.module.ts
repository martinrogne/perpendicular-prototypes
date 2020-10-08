import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartItemComponent } from './cart-item/cart-item.component';
import { DirectivesModule } from '../directives/directives.module';
import { CartRemoveDirectiveModule, CartQuantityDirectiveModule } from 'perpendicular-directives';


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
    CheckoutRoutingModule,
    DirectivesModule,
    CartRemoveDirectiveModule,
    CartQuantityDirectiveModule
  ]
})
export class CheckoutModule { }
