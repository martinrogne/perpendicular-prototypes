import { NgModule } from '@angular/core';
import { IAddressFactory } from 'perpendicular-core';
import { WCSAddressFactory } from './wcs-address.factory';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IAddressFactory, useClass: WCSAddressFactory }
  ]
})
export class WCSAddressFactoryModule { }
