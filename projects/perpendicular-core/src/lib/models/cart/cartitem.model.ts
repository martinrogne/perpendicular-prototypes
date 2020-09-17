import { BaseModel } from '../base.model';
import { Attribute } from '../productattribute.model';
import { Adjustment } from './adjustment.model';
import { CartItemAttribute } from './cartitemattribute.model';
import { CartItemComponent } from './cartitemcomponent.model';

/**
 * This class represents one item in a shopping cart. The class provides information about the product in cart,
 * the price of it, and any image assets that may be useful
 */
export class CartItem extends BaseModel {
  /**
   * internal Id of the product associated with this line item.
   */
  public productId?: string;

  /**
   * The part number of the product. Populated immediatly from the server response.
   */
  public partNumber?: string;

  /**
   * Name of product.  Not filled in until the *product* promise have been resolved. You can bind with this
   * before the promise is resolved however.
   */
  public name = '';

  /**
   * ThumbnailImage for displaying the item.   Not filled in until the *product* promise have been resolved. You can bind with this
   * before the promise is resolved however.
   */
  public thumbnailImage = '';

  /**
   * Total Value of products of item in cart. Populated immediatly from the server response.
   */
  public price = 0;

  /**
   * Unit price of product.
   * Use this in display situtations to avoid having to do (possibly) faulty math directly in the frontend.
   */
  public unitprice = 0;

  /**
   * The currency in which the cart is kept. While technically you could have different currencies for each category of amount
   * (product, tax, shipping), perpendicular assumes it is the same for all. This information is also available on the Cart object
   * but is added here for easy reference.
   *
   * Contains the 3 letter currency code. I.e. 'USD','GBP', etc
   */
  public currency = '';

  /**
   * Quantity of items added. Populated immediatly from the server response.
   */
  public quantity = 0;

  /**
   * Internal identifier for this cart item.
   */
  public lineId?: string;

  /**
   * SEO Slug for product in item.  Not filled in until the *product* promise have been resolved. You can bind with this
   * before the promise is resolved however.
   */
  public seoslug = '';

  /**
   * List of attributes and their set values. I.e. if the item is a "Shirt", the definingAttributes will list "Size": "XL",
   * and "Color": "Green". The attributes dictate which variant of a product is added to the basket.  Not filled in until
   * the *product* promise have been resolved. You can bind with this before the promise is resolved however.
   */
  public definingAttributes: Array<Attribute> = [];

  /**
   * The current inventory allocation status for this cart item.
   * Before completing pre-checkout this will probably read something like 'Available', or 'Backorderable' or 'Unavailable'
   * After precheckout, it should read 'Allocated', or 'Backordered'.
   */
  public inventoryStatus = '';

  /**
   * The adjustments made against the whole cart.
   */
  public adjustments: Array<Adjustment> = [];

  /**
   * Indicates if this order item is a free gift, issued by the promotion engine.
   * Free gifts cannot be removed directly from the basket, nor can the quantity change.
   *
   * If the free-gift is issued as a "choice of gift" option from the promotion system, items can
   * be removed by calling ```cartService.removeFromCart()``` with the gift choice from ```cart.freeGiftOptions[x].choices[y]```
   */
  public isFreeGift = false;

  /**
   * The list of attributes associated with the item
   */
  public attributes: Array<CartItemAttribute> = [];

  /**
   * List of components that make up this item.
   */
  public components: CartItemComponent[] = [];
}
