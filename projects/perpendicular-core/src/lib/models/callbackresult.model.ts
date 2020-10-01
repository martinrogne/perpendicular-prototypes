import { BaseModel } from './base.model';

/**
 * This class contains the result of a previously executed punchout payment transaction. It will
 * tell if the user has completed the external flow, and if the money was successfully authorized.
 */
export class CallbackResult extends BaseModel {
  /**
   * The orderId that was used to ask for payment.
   */
  public orderId?: string;

  /**
   * The transaction result.
   * FIXME: Add enumeration instead of just a string
   */
  public punchoutTranResult = '';

  /**
   * The payment status, ie. 'success', 'failure', 'cancel' or similar
   */
  public status = '';

  /**
   * The key of the status response, which may be used to map up a given error or response message
   * for display to the customer
   */
  public statusMessageKey = '';
}
