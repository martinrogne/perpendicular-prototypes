import { NgModule } from '@angular/core';
import { PerpendicularNextCoreModule } from './perpendicular-next-core/perpendicular-next-core.module';
import { PerpendicularNextProvidersWCSModule } from './perpendicular-next-providers-wcs/perpendicular-next-providers-wcs.module';
import { PerpendicularNextServicesWCSModule } from './perpendicular-next-services-wcs/perpendicular-next-services-wcs.module';
import { PerpendicularNextServicesBaseModule } from './perpendicular-next-services-base/perpendicular-next-services-base.module';

/**
 * Module containing the optimized Perpendicular functionality
 * for the prototype project
 */
@NgModule({
  declarations: [],
  imports: [
    PerpendicularNextCoreModule,
    PerpendicularNextProvidersWCSModule,
    PerpendicularNextServicesWCSModule,
    PerpendicularNextServicesBaseModule
  ],
  exports: []
})
export class PerpendicularNextModule { }
