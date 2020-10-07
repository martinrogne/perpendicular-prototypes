import { NgModule } from '@angular/core';
import { WCSPaymentInstructionFactory } from './wcs-payment-instruction.factory';
import { IPaymentInstructionFactory } from 'perpendicular-core';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IPaymentInstructionFactory, useClass: WCSPaymentInstructionFactory}
  ]
})
export class WCSPaymentInstructionFactoryModule { }
