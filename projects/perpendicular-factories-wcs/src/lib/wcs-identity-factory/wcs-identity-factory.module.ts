import { NgModule } from '@angular/core';
import { IIdentityFactory } from 'perpendicular-core';
import { WCSIdentityFactory } from './wcs-identity.factory';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IIdentityFactory, useClass: WCSIdentityFactory }
  ]
})
export class WCSIdentityFactoryModule { }
