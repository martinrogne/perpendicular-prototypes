import { NgModule } from '@angular/core';
import { WCSProductSearchProvider } from './wcs-product-search.provider';
import { IProductSearchProvider } from 'perpendicular-core';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProductSearchProvider, useClass: WCSProductSearchProvider }
  ]
})
export class WCSProductSearchProviderModule { }
