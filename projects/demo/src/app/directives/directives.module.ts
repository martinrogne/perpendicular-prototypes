import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadProductPageDirective } from './lazy-load-product-page.directive';

/**
 * Module containing all the utility directives that
 * may be used in the site
 */
@NgModule({
  declarations: [
    LazyLoadProductPageDirective,
  ],
  exports: [
    LazyLoadProductPageDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
