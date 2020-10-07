import { NgModule } from '@angular/core';
import { IShippingModeFactory } from 'perpendicular-core';
import { WCSShippingModeFactory } from './wcs-shipping-mode.factory';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IShippingModeFactory, useClass: WCSShippingModeFactory }
  ]
})
export class WCSShippingModeFactoryModule { }
