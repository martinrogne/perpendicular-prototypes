import { NgModule } from '@angular/core';
import { WCSCartFactory } from './wcs-cart.factory';
import { ICartFactory } from 'perpendicular-core';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: ICartFactory, useClass: WCSCartFactory}
  ]
})
export class WCSCartFactoryModule { }
