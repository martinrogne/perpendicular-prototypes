import { Product } from './product.model';
import { Attribute } from './productattribute.model';
import { OrderItemAttribute } from './orderitemattribute.model';
import { OrderItemComponent } from './orderitemcomponent.model';
import { Adjustment } from './cart/adjustment.model';
import { BaseModel } from './base.model';

/**
 * This class represents a single order item. It contains information about the SKU being bought,
 * as well as the breakdown on how the price were arrived at.
 * This class cannot live independently of an *Order* object, so no back-pointer is provided.
 */
export class OrderItem extends BaseModel {
  /**
   * The internal order item ID
   */
  public orderItemId?: string;

  /**
   * The internal product id
   */
  public productId?: string;

  /**
   * The external product id. Can be shown to customers.
   */
  public partNumber?: string;

  /**
   * The name of the product being bought.
   * This field is not filled in until the *product* promise is resolved. You can still bind to it though.
   */
  public name = '';

  /**
   * The Fully qualified URL of the thumbnail image of the product being bought.
   * This field is not filled in until the *product* promise is resolved. You can still bind to it though.
   */
  public thumbnailImage = '';

  /**
   * Quantity bought.
   */
  public quantity = 0;

  /**
   * The unit price of the product, at time of purchase.
   */
  public unitPrice = 0;

  /**
   * total product price for this order item
   */
  public orderItemPrice = 0;

  /**
   * 3 letter currency code to use
   */
  public currency = '';

  /**
   * The SEO Slug for the product in the orderitem.
   * This field is not filled in until the *product* promise is resolved. You can still bind to it though.
   */
  public seoslug = '';

  /**
   * Defining attributes of the SKU in the orderitem. If the SKU is a "Shirt", the defining attributes could be
   * "Size: XL", and "Color: green"
   */
  public definingAttributes: Array<Attribute> = [];

  /**
   * The list of attributes associated with the item
   */
  public attributes: Array<OrderItemAttribute> = [];

  /**
   * The date at which the item was, or will be, shipped
   */
  public dateShipped?: Date;

  /**
   * If the item is a kit, this is the components that the kit is made up of.
   */
  public components: OrderItemComponent[] = [];

  /**
   * The adjustments made against the order item.
   */
  public adjustments: Array<Adjustment> = [];

  /**
   * Order status of the order item.
   */
  public status = '';

  /**
   * The current inventory allocation status for this cart item.
   * Before completing pre-checkout this will probably read something like 'Available', or 'Backorderable' or 'Unavailable'
   * After precheckout, it should read 'Allocated', or 'Backordered'.
   */
  public inventoryStatus = '';

  /**
   * The comments for this order item
   */
  public comment = '';

  /**
   * The promise of the product for the order
   */
  private thePromise: Promise<Product> | null = null;

  /**
   * This function is present to allow the service layer to push in (potentially cached) product information.
   * Should not be accessed outside the service layer.
   */
  public set product(promise: Promise<Product> | null) {
    this.thePromise = promise;

    if (this.thePromise !== null) {
      this.thePromise.then(x => {
        const p: Product = x;
        if (p) {
          this.name = p.name || '';
          this.thumbnailImage = p.thumbnailImage || '';
          this.seoslug = p.seoslug;
          this.definingAttributes = p.definingAttributes;
        }
      });
    }
  }

  /**
   * Returns the product promise
   * Should not be accessed outside the service layer.
   */
  public get product(): Promise<Product> | null {
    return this.thePromise;
  }
}
