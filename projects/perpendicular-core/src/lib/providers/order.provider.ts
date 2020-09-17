import { Order } from '../models/order.model';
import { ISearchProvider } from '../providers/base.search.provider';
import { OrderSearchQuery, OrderSearchResult } from './../models/order-search.model';

/**
 * Backend driver to fetch historic orders.
 * Use this to fetch order history, or post-cart order display.
 */
export abstract class IOrderProvider extends ISearchProvider<Order, OrderSearchQuery, OrderSearchResult> {
  /**
   * Returns an order by its id
   * @param orderId the order id to look up.
   */
  public abstract getOrder(orderId: string): Promise<Order>;

  /**
   * Cancels the order
   */
  public abstract cancelOrder(order: Order): Promise<void>;
}
