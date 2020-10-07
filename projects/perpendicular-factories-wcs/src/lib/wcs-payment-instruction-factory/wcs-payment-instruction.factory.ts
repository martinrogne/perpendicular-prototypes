import { WCSPaymentMethod, WCSPaymentInstruction } from 'perpendicular-models-wcs';
import { Inject, Injectable } from '@angular/core';

import { PaymentInstruction, PaymentMethod, IPaymentInstructionFactory } from 'perpendicular-core';
/**
 * This class serves as an extension point for projects to hook into, and override specific model classes and their
 * deserialization.
 *
 * Perpendicular default behavior is to not know anything about how classes gets filled in. This is left as an excercies for the
 * backend components. That means, that all models here, are abstract superclasses, where each
 * backend component have to provide their own logic on how to deserialize the backend result message into the model.
 */
@Injectable()
export class WCSPaymentInstructionFactory extends IPaymentInstructionFactory {
  constructor() {
    super();
  }
  /**
   * instantiates a new PaymentInstruction object
   */
  public newInstance(): PaymentInstruction {
    return new WCSPaymentInstruction();
  }

  /**
   * instantiates a new PaymentInstruction object based on a selected PaymentMethod
   */
  public newInstanceFromPaymentMethod(paymentMethod: PaymentMethod): PaymentInstruction {
    const paymentInstruction: PaymentInstruction = this.composeFromPaymentMethod(paymentMethod);
    return paymentInstruction;
  }

  /**
   * instantiates a new PaymentMethod object from JSON
   */
  public newInstanceFromJSON(json: any): PaymentInstruction {
    const paymentInstruction: PaymentInstruction = this.composePaymentInstruction(json);

    return Object.freeze(paymentInstruction);
  }

  protected composeFromPaymentMethod(paymentMethod: PaymentMethod): PaymentInstruction {
    const paymentInstruction: PaymentInstruction = this.newInstance();

    paymentInstruction.paymentMethodName = paymentMethod.paymentMethodName || '';
    paymentInstruction.isPunchoutPaymentInstruction = this.isPunchoutPaymentMethod(paymentMethod.paymentMethodName || '');

    (paymentInstruction as WCSPaymentInstruction).paymentTermConditionId = (paymentMethod as WCSPaymentMethod).paymentTermConditionId;

    return paymentInstruction;
  }

  /**
   * Returns true, if the payment method name is known to be a candidate for punchout payments.
   * @param name
   */
  protected isPunchoutPaymentMethod(paymentMethodName: string): boolean {
    if ('NetsPunchoutV2' === paymentMethodName || 'SimplePunchout' === paymentMethodName) {
      return true;
    }
    return false;
  }

  protected composePaymentInstruction(json: any): PaymentInstruction {
    const paymentInstruction: PaymentInstruction = this.newInstance();

    paymentInstruction.aymentInstructionId = json.piId || '';
    paymentInstruction.status = json.piStatus;
    paymentInstruction.billingAddressId = json.billingAddressId;

    paymentInstruction.amount = Number(json.piAmount);
    paymentInstruction.currency = json.piCurrency;
    paymentInstruction.paymentMethodName = json.payMethodId;
    paymentInstruction.description = json.piDescription || paymentInstruction.paymentMethodName;
    paymentInstruction.punchoutURL = json.xpapi_punchoutPopupURL;

    paymentInstruction.protocolData = {};
    if (!!json.protocolData) {
      for (const data of json.protocolData) {
        paymentInstruction.protocolData[data.name] = data.value;
      }
    }

    paymentInstruction.isPunchoutPaymentInstruction = this.isPunchoutPaymentMethod(paymentInstruction.paymentMethodName);
    return paymentInstruction;
  }
}
