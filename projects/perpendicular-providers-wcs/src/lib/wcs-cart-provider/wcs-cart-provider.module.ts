import { NgModule } from '@angular/core';
import { ICartProvider } from 'perpendicular-core';
import { WCSCartProvider } from './wcs-cart.provider';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: ICartProvider, useClass: WCSCartProvider}
  ]
})
export class WCSCartProviderModule { }
