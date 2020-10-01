import { HttpParams } from '@angular/common/http';
import { Order } from '../models/order.model';
import { CallbackResult } from '../models/callbackresult.model';

/**
 * UI service to deal with orders post-cart.
 * Once the cart is submitted, it becomes accessible only through this service.
 *
 */
export abstract class IOrderService<OrderType extends Order = Order> {
  /**
   * Returns a specific order
   *
   * @param orderId the order to fetch.
   */
  public abstract getOrder(orderId: string): Promise<OrderType>;

  /**
   * Fetches SUMMARY versions of the first 10 orders with the provided status.
   * This function is not intended for order history management, but rather to allow
   * store logic to check if the customer has any orders in a specific status, and take
   * special display action on this.
   */
  public abstract getOrdersByStatus(status: string): Promise<OrderType[]>;

  /**
   * Initializes the payment transaction in the external payment provider
   *
   *
   * @param orderId the order to set up payments for.
   * @param paymentTransactionId the payment instruction you wish to get the url for.
   * @return the url to redirect to, and a transaction id.
   */
  public abstract getPunchoutUrl(orderId: string, paymentTransactionId: string): Promise<string>;

  /**
   * Call this after user comes back from external payment provider, to notify backend server that it can
   * go and verify that payment was authorized.
   * Notifies the backend that a customer has come back from an external payment window.
   * As we can't know what the external payment provider is passing back, we simply forward whatever we get here.
   */
  public abstract punchoutCallback(params: HttpParams): Promise<CallbackResult>;

  /**
   * If the customer cancels the external payment process, the backend instruction may have become invalidated.
   * This function asks backend to reset the failed punchout payment instruction so it can be retried.
   */
  public abstract punchoutRetry(orderId: string, paymentInstructionId: string): Promise<string>;

  /**
   * Cancels an order
   */
  public abstract cancelOrder(order: OrderType): Promise<void>;
}
