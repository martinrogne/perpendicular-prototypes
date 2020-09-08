import { NgModule } from '@angular/core';
import { IDENTITY_SERVICE_FETCH_ENTITLED_ORGS, IdentityService } from '@perpendicular/services-wcs';
import { IIdentityService } from '@perpendicular/core';

/**
 * Perpendicular next module containing all WCS specific services
 */
@NgModule({
  providers: [
    {
      provide: IIdentityService,
      useClass: IdentityService,
    },
    {
      provide: IDENTITY_SERVICE_FETCH_ENTITLED_ORGS,
      useValue: false,
    },
  ],
})
export class PerpendicularNextServicesWCSModule { }
