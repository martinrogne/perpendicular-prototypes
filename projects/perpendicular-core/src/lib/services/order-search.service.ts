import { Order } from './../models/order.model';
import { ISearchService } from './base.search.service';

import { OrderSearchQuery, OrderSearchResult, OrderSearchSortBy } from '../models/order-search.model';

/**
 * Stateful service for operating on [[OrderSearch]].
 *
 * Note, this is only designed to be used by CSRs.
 *
 * Frontend devs should use OrderHistoryService to get orders for a specific user.
 *
 * Special for this service is, that it wont search unless you have specified either
 *  - orderDateFrom/orderDateTo
 *  - userId
 *  or
 *  - organizationId
 */
export abstract class IOrderSearchService<
  OrderType extends Order = Order,
  OrderSearchQueryType extends OrderSearchQuery = OrderSearchQuery,
  OrderSearchResultType extends OrderSearchResult<OrderType, OrderSearchQueryType> = OrderSearchResult<OrderType, OrderSearchQueryType>
> extends ISearchService<OrderType, OrderSearchQueryType, OrderSearchResultType> {
  /**
   * Sort order
   */
  public abstract sortBy: OrderSearchSortBy;

  /**
   * A string which the customers first name should contain - case insensetive
   */
  public abstract firstName: string;

  /**
   * A string which the customers last name should contain - case insensetive
   */
  public abstract lastName: string;

  /**
   * A string which the address of the customers primary address should contain - case insensetive
   */
  public abstract streetAddress: string;

  /**
   * A string which the city of the customers primary address should contain - case insensetive
   */
  public abstract city: string;

  /**
   * A string which the zipcode of the customers primary address should contain - case insensetive
   */
  public abstract zipCode: string;

  /**
   * A string which the state of the customers primary address should contain - case insensetive
   */
  public abstract addressState: string;

  /**
   * A string which the email of the customers primary address should contain - case insensetive
   */
  public abstract email: string;

  /**
   * A string which the phone of the customers primary address should contain - case insensetive
   */
  public abstract phone: string;

  /**
   * The starting date from which to include orders, with respect to when they were placed
   */
  public abstract orderDateFrom: Date;

  /**
   * The ending date from which to include orders, with respect to when they were placed
   */
  public abstract orderDateTo: Date;

  /**
   * A string which the order ID should contain - case insensetive
   */
  public abstract orderId: string;

  /**
   * OrganizationId, find only from this organization
   */
  public abstract organizationId: string;

  /**
   * UserId, find only from this user
   */
  public abstract userId: string;

  /**
   * Status'es to find
   */
  public abstract status: string[];

  /**
   * A string which the organization for which the order was placed should contain - case insensetive
   */
  public abstract parentOrgName: string;
}
