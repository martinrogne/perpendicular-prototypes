import { ShippingMode } from './shippingmode.model';
import { Address } from './address.model';
import { BaseModel } from './base.model';

/**
 * Base class for data shared between orders / carts and requisition lists.
 */
export abstract class BaseOrder extends BaseModel {
  /**
   * The ID of the order
   */
  public id?: string;

  /**
   * Selected shipping mode
   */
  public shippingMode?: ShippingMode;

  /**
   * The date at which the order was last updated
   * or modified
   */
  public lastModified?: Date;

  /**
   * The ID of the customer making the purchase. This can be either a *Guest* account or a *Registed Customers* account.
   */
  public userId?: string;

  /**
   * The currency in which the cart is kept. While technically you could have different currencies for each category of amount
   * (product, tax, shipping), perpendicular assumes it is the same for all.
   * Contains the 3 letter currency code. I.e. 'USD','GBP', etc
   */
  public currency?: string;

  /**
   * Organization of the order (if applicable)
   */
  public organizationId?: string;

  /**
   * The grand total amount, in customers selected currency. Value represented in decimal form.
   */
  public grandTotalAmount = 0;

  /**
   * The total shipping cost of items in this order (if known).
   */
  public shippingTotalAmount = 0;

  /**
   * The value of any promotions or discounts that have been applied to items in the order
   */
  public adjustmentTotalAmount = 0;

  /**
   * The value of all products (i.e. qty x unitprice), prior to discounts being applied.
   */
  public productTotalAmount = 0;

  /**
   * Tax value of shipping total. Usually already included in the =shipping= value, but is included here for display purposes.
   */
  public shippingTaxTotalAmount = 0;

  /**
   * Tax value of product price, excluding promotions. Usually already included in the =shipping= value, but is included
   * here for display purposes.
   */
  public salesTaxTotalAmount = 0;

  /**
   * The billing address set on the current order
   */
  public billingAddress?: Address;
}
