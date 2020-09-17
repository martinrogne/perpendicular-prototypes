import { NgModule } from '@angular/core';
import { IIdentityProvider } from 'perpendicular-core';
import { WCSIdentityProvider } from './wcs-identity.provider';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IIdentityProvider, useClass: WCSIdentityProvider }
  ]
})
export class WCSIdentityProviderModule { }
