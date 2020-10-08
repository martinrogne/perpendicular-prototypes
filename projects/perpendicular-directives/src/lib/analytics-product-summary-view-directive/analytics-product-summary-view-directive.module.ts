import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsProductSummaryViewDirective } from './analytics-product-summary-view.directive';



@NgModule({
  declarations: [AnalyticsProductSummaryViewDirective],
  imports: [
    CommonModule
  ],
  exports: [
    AnalyticsProductSummaryViewDirective
  ]
})
export class AnalyticsProductSummaryViewDirectiveModule { }
