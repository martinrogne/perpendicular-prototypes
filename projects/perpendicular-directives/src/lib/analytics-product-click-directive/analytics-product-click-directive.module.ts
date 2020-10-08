import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsProductClickDirective } from './analytics-product-click.directive';



@NgModule({
  declarations: [AnalyticsProductClickDirective],
  imports: [
    CommonModule
  ],
  exports: [
    AnalyticsProductClickDirective
  ]
})
export class AnalyticsProductClickDirectiveModule { }
