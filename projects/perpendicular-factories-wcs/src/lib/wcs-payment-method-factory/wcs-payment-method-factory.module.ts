import { NgModule } from '@angular/core';
import { IPaymentMethodFactory } from 'perpendicular-core';
import { WCSPaymentMethodFactory } from './wcs-payment-method.factory';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IPaymentMethodFactory, useClass: WCSPaymentMethodFactory }
  ]
})
export class WCSPaymentMethodFactoryModule { }
