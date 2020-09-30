import { NgModule } from '@angular/core';
import { IAnalyticsService } from 'perpendicular-core';
import { AnalyticsService } from './analytics.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IAnalyticsService, useClass: AnalyticsService }
  ]
})
export class AnalyticsServiceModule { }

export { AnalyticsService } from './analytics.service';