import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartDirective } from './add-to-cart.directive';
import { LazyLoadProductPageDirective } from './lazy-load-product-page.directive';
import { AnalyticsProductClickDirective } from './analytics-product-click.directive';
import { AnalyticsProductImpressionDirective } from './analytics-product-impression.directive';

/**
 * Module containing all the utility directives that
 * may be used in the site
 */
@NgModule({
  declarations: [
    AddToCartDirective,
    LazyLoadProductPageDirective,
    AnalyticsProductClickDirective,
    AnalyticsProductImpressionDirective
  ],
  exports: [
    AddToCartDirective,
    LazyLoadProductPageDirective,
    AnalyticsProductClickDirective,
    AnalyticsProductImpressionDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
