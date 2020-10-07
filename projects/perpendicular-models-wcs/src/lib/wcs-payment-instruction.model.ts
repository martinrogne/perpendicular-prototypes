import { PaymentInstruction } from 'perpendicular-core';

export class WCSPaymentInstruction extends PaymentInstruction {

 /**
  * Internal reference to which contract the payment method was authorized under.
  */
  public paymentTermConditionId = '';
}
