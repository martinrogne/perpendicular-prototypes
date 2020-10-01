import { BaseModel } from './base.model';

/**
 * This class represents an OFFER price for a SKU or product.
 */
export class Price extends BaseModel {
  /**
   * The offerprice. I.e. what the customer can buy the product for right now.
   */
  public entitledUnitPrice = 0;

  /**
   * 3 letter currency code to use with price display
   */
  public currency = '';

  /**
   * The unique ID of the product to which the price belongs
   */
  public productId?: string;
}
