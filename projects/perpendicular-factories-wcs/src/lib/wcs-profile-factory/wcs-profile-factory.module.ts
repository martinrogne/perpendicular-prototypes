import { NgModule } from '@angular/core';
import { WCSProfileFactory } from './wcs-profile.factory';
import { IProfileFactory } from 'perpendicular-core';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProfileFactory, useClass: WCSProfileFactory }
  ]
})
export class WCSProfileFactoryModule { }
