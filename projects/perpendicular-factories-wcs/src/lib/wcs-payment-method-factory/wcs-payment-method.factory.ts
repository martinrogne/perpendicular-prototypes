import { Inject, Injectable } from '@angular/core';

import { IPaymentMethodFactory, PaymentMethod } from 'perpendicular-core';
import { WCSPaymentMethod } from 'perpendicular-models-wcs';

/**
 * A factory to deserialize static content page definitions from WebSphere Commerce.
 */
@Injectable()
export class WCSPaymentMethodFactory extends IPaymentMethodFactory {
  /**
   * Default constructor. Do not instantiate this class directly. Get it from the DI framework.
   */
  constructor() {
    super();
  }

  /**
   * Instantiates a new content page defition.
   */
  public newInstance(): PaymentMethod {
    const l: PaymentMethod = new WCSPaymentMethod();
    return l;
  }

  /**
   * Instantiates a new content page definition, and deserializes the json coming from WebSphere Commerce.
   */
  public newInstanceFromJSON(json: any): PaymentMethod {
    const l: PaymentMethod = this.composePaymentMethod(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return Object.freeze(l);
  }

  public newInstancesFromJSON(json: any): Array<PaymentMethod> {
    const result = new Array<PaymentMethod>();

    for (const paymentInformation of json.usablePaymentInformation) {
      const method = this.composePaymentMethod(paymentInformation);

      result.push(method);
    }

    return result;
  }

  /**
   * Extension point for overriding the default json deserialization logic.
   */
  protected composePaymentMethod(json: any): PaymentMethod {
    const paymentMethod: PaymentMethod = this.newInstance();

    paymentMethod.description = json.description || json.paymentMethodName;
    paymentMethod.paymentMethodName = json.paymentMethodName;
    (paymentMethod as WCSPaymentMethod).paymentTermConditionId = json.paymentTermConditionId;
    return paymentMethod;
  }
}
