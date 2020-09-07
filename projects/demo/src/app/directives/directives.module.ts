import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartDirective } from './add-to-cart.directive';
import { LazyLoadProductPageDirective } from './lazy-load-product-page.directive';

/**
 * Module containing all the utility directives that
 * may be used in the site
 */
@NgModule({
  declarations: [
    AddToCartDirective,
    LazyLoadProductPageDirective
  ],
  exports: [
    AddToCartDirective,
    LazyLoadProductPageDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
