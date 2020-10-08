import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartAddDirective } from './cart-add.directive';



@NgModule({
  declarations: [CartAddDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CartAddDirective
  ]
})
export class CartAddDirectiveModule { }
