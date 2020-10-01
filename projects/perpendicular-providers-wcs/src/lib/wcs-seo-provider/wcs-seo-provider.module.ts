import { NgModule } from '@angular/core';
import { ISEOProvider } from 'perpendicular-core';
import { WCSSEOProvider } from './wcs-seo.provider';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: ISEOProvider, useClass: WCSSEOProvider }
  ]
})
export class WCSSEOProviderModule { }
