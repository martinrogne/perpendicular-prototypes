import { NgModule } from '@angular/core';
import { MockAnalyticsService } from './mock-analytics.service';
import { IAnalyticsService } from 'perpendicular-core';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IAnalyticsService, useClass: MockAnalyticsService }
  ]
})
export class MockAnalyticsServiceModule { }
