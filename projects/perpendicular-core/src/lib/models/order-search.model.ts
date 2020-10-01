import { BaseSearchQuery, BaseSearchResult } from './base.search.model';
import { Order } from './order.model';

/**
 * Sorting options for order search results
 */
export enum OrderSearchSortBy {
  SORT_ORDERID = 0,
  SORT_ORDERID_DESC,
  SORT_ORDERDATE,
  SORT_ORDERDATE_DESC,
}

/**
 * A Model class representing OrderSearchQuery
 */
export class OrderSearchQuery extends BaseSearchQuery {
  /**
   * Sort order
   */
  public sortBy: OrderSearchSortBy;

  /**
   * A string which the customers first name should contain - case insensetive
   */
  public firstName?: string;

  /**
   * A string which the customers last name should contain - case insensetive
   */
  public lastName?: string;

  /**
   * A string which the address of the customers primary address should contain - case insensetive
   */
  public streetAddress?: string;

  /**
   * A string which the city of the customers primary address should contain - case insensetive
   */
  public city?: string;

  /**
   * A string which the zipcode of the customers primary address should contain - case insensetive
   */
  public zipCode?: string;

  /**
   * A string which the state of the customers primary address should contain - case insensetive
   */
  public state?: string;

  /**
   * A string which the email of the customers primary address should contain - case insensetive
   */
  public email?: string;

  /**
   * A string which the phone of the customers primary address should contain - case insensetive
   */
  public phone?: string;

  /**
   * The starting date from which to include orders, with respect to when they were placed
   */
  public orderDateFrom?: Date;

  /**
   * The ending date from which to include orders, with respect to when they were placed
   */
  public orderDateTo?: Date;

  /**
   * A string which the order ID should contain - case insensetive
   */
  public orderId?: string;

  /**
   * OrganizationId, find only from this organization
   */
  public organizationId?: string;

  /**
   * UserId, find only from this user
   */
  public userId?: string;

  /**
   * Status'es to find
   */
  public status: string[];

  /**
   * A string which the organization for which the order was placed should contain - case insensetive
   */
  public parentOrgName?: string;

  /**
   * Default constructor
   */
  constructor(q?: OrderSearchQuery) {
    super(q);

    if (!!q) {
      this.city = q.city;
      this.email = q.email;
      this.firstName = q.firstName;
      this.lastName = q.lastName;
      this.orderDateFrom = q.orderDateFrom;
      this.orderDateTo = q.orderDateTo;
      this.orderId = q.orderId;
      this.organizationId = q.organizationId;
      this.parentOrgName = q.parentOrgName;
      this.phone = q.phone;
      this.sortBy = q.sortBy;
      this.state = q.state;
      this.status = [...q.status];
      this.streetAddress = q.streetAddress;
      this.userId = q.userId;
      this.zipCode = q.zipCode;
    } else {
      this.status = ['P', 'M', 'C', 'G', 'H', 'F', 'D', 'S', 'R', 'L'];
      this.sortBy = OrderSearchSortBy.SORT_ORDERID_DESC;
    }
  }
}

/**
 * A Model class representing OrderSearchResults
 */
export class OrderSearchResult<
  OrderType extends Order = Order,
  OrderSearchQueryType extends OrderSearchQuery = OrderSearchQuery
> extends BaseSearchResult<OrderType, OrderSearchQueryType> {}
