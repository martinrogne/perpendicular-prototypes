import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProductFactory } from 'perpendicular-core';
import { WCSProductFactory } from './wcs-product.factory';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProductFactory, useClass: WCSProductFactory }
  ]
})
export class WCSProductFactoryModule { }
