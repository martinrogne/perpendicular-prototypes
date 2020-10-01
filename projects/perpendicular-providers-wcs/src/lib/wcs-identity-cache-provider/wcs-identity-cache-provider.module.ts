import { NgModule } from '@angular/core';
import { WCSIdentityCacheProvider } from './wcs-identity-cache.provider';
import { IIdentityCacheProvider } from 'perpendicular-core';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IIdentityCacheProvider, useClass: WCSIdentityCacheProvider }
  ]
})
export class WCSIdentityCacheProviderModule { }
