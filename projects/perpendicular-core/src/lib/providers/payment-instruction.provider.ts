import { PaymentInstruction } from '../models/payment-instruction.model';
import { HttpParams } from '@angular/common/http';
import { CallbackResult } from '../models/callbackresult.model';

/**
 * A provider to add a payment instruction to the current cart.
 *
 * FIXME: Do we really need this?
 */
export abstract class IPaymentInstructionProvider {
  /**
   * Adds the payment instruction to the cart
   *
   * @param payMethodName the name of the payment method as returned by the [[ICartProvider]]s getValidPaymentMethods call.
   * @param piAmount the amount in text, formatted using US decimal points, no thousand seperators.
   * @param billingAddressId a valid billing address id.
   * @param protocolData any additional parameters the payment method requires to complete. For 'Check' this might be the routing number,
   *        for online credit card processing, it would be account number, cvc, etc.
   */
  public abstract addPaymentInstruction(
    payMethodName: string,
    piAmount: string,
    billingAddressId: string,
    protocolData?: any,
  ): Promise<void>;

  /**
   * Clears all payment instructions for the cart.
   */
  public abstract deleteAllPaymentInstructionsFromCart(): Promise<void>;

  /**
   * Fetches punchout information (and prepares the punchout transaction on the payment providers backend)
   */
  public abstract preparePunchout(orderId: string, paymentInstructionId: string): Promise<string>;

  /**
   * Retries a failed punchout attempt. This will set up a new transaction with the backend
   */
  public abstract retryPunchout(orderId: string, paymentInstructionId: string): Promise<string>;

  /**
   * Notfies backend that the user came back from a punchout payment provider window.
   * As we can't know exactly what the backend requires for this, we allow the frontend to pass along any and all
   * parameters typically gotten from the router.urlParams.
   */
  public abstract callbackPunchout(parameters: HttpParams): Promise<CallbackResult>;

  /**
   * Fetches the default set of protocol data to apply
   */

  public abstract getDefaultProtocolData(paymentInstruction: PaymentInstruction): Promise<any>;
}
