import { NgModule } from '@angular/core';
import { ISEOTokenFactory } from 'perpendicular-core';
import { WCSSEOTokenFactory } from './wcs-seo-token-factory.factory';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: ISEOTokenFactory, useClass: WCSSEOTokenFactory }
  ]
})
export class WCSSEOTokenFactoryModule { }
