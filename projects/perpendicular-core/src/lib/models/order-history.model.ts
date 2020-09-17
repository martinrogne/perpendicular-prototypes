import { BaseSearchQuery, BaseSearchResult } from './base.search.model';
import { Order } from './order.model';

/**
 * Specific sort order
 * NOTE: WCS Does not support sorting order history results yet.
 */
export enum OrderHistorySortOrder {
  Ascending,
  Descending,
}

/**
 * Specific Sorting fields
 * NOTE: WCS Does not support sorting order history results yet.
 */
export enum OrderHistorySortField {
  OrderId,
  Timeplaced,
  Status,
}

/**
 * Class to hold a query for order history
 */
export class OrderHistoryQuery extends BaseSearchQuery {
  /**
   * The set of statuses to fetch. These will be OR'ed together. If no statuses are set, all non-cart/non-deleted orders are returned.
   */
  public status: string[] = [];

  constructor(q: OrderHistoryQuery) {
    super(q);
    if (q) {
      this.status = [...q.status];
    }
  }
}

/**
 * This class represents a paged result from the order history.
 */
export class OrderHistoryResult<
  OrderType extends Order = Order,
  OrderHistoryQueryType extends OrderHistoryQuery = OrderHistoryQuery
> extends BaseSearchResult<OrderType, OrderHistoryQueryType> {}
