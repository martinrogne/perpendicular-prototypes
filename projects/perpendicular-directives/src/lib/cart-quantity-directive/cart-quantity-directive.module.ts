import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartQuantityDirective } from './cart-quantity.directive';



@NgModule({
  declarations: [CartQuantityDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CartQuantityDirective
  ]
})
export class CartQuantityDirectiveModule { }
