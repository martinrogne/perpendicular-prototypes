import { ISearchService } from './base.search.service';

import { Order } from '../models/order.model';
import { OrderHistoryResult, OrderHistoryQuery } from '../models/order-history.model';
/**
 * UI stateful service to deal with order history.
 *
 * Supports paging, and filtering by status.
 */
export abstract class IOrderHistoryService<
  OrderType extends Order = Order,
  OrderHistoryQueryType extends OrderHistoryQuery = OrderHistoryQuery,
  OrderHistoryResultType extends OrderHistoryResult<OrderType, OrderHistoryQueryType> = OrderHistoryResult<OrderType, OrderHistoryQueryType>
> extends ISearchService<OrderType, OrderHistoryQueryType, OrderHistoryResultType> {
  /**
   * Add these statuses to the query. Limits the result to contain only orders of those statuses. Statii?
   *
   * Overwrites existing status filter. Will reset *pageNumber* to 1, but leave *pageSize* as it was
   * @example
   * ```
   *   // only get orders that are shipped or fully paid
   *   orderHistoryService.filterByStatus('S','D');
   * ```
   */
  public abstract filterByStatus(...statuses: string[]): void;

  /**
   * Removes all status filters from the history. Will reset *pageNumber* to 1.
   * @example
   * ```
   *   // get all statuses again.
   *   orderHistoryService.clearStatusFilter
   * ```
   */
  public abstract clearStatusFilter(): void;
}
