import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRemoveDirective } from './cart-remove.directive';

@NgModule({
  declarations: [CartRemoveDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CartRemoveDirective
  ]
})
export class CartRemoveDirectiveModule { }
