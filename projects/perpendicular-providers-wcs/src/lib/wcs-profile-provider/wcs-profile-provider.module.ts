import { NgModule } from '@angular/core';
import { IProfileProvider } from 'perpendicular-core';
import { WCSProfileProvider } from './wcs-profile.provider';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProfileProvider, useClass: WCSProfileProvider }
  ]
})
export class WCSProfileProviderModule { }
