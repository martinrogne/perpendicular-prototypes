import { PaymentMethod } from 'perpendicular-core';

/**
 * WebSphere Commerce specific implementation of [[Page]]
 */
export class WCSPaymentMethod extends PaymentMethod {

  /**
   * Internal reference to which contract the payment method was authorized under.
   */
  public paymentTermConditionId = '';

  /**
   * Default Constructor
   */
  constructor() {
        super();
    }
}
