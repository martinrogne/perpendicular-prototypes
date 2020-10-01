import { CallbackResult } from '../models/callbackresult.model';

/**
 * An abstract factory to create instances of [[PaymentCallbackFactory]]
 */
export abstract class IPaymentCallbackFactoryFactory {
  /**
   * Creates a new [[PaymentCallbackFactory]]
   */
  public abstract newInstance(): CallbackResult;

  /**
   * Deserializes a new  [[PaymentCallbackFactory]] from a backend response from [[IPaymentCallbackFactoryProvider]]
   */
  public abstract newInstanceFromJSON(json: any): CallbackResult;
}
