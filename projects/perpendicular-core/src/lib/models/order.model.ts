import { PaymentInstruction } from './payment-instruction.model';
import { OrderItem } from './orderitem.model';
import { Address } from './address.model';
import { OrderItemAttribute } from './orderitemattribute.model';
import { Adjustment } from './cart/adjustment.model';
import { BaseOrder } from './baseorder.model';

/**
 * This class represents a historical order. It contains information about all the items of the order, along
 * with financial breakdown on how the total price was arrived at, and how the customer chose to pay for it.
 *
 * NOTE: a Cart is just an order with status "P".
 */
export class Order extends BaseOrder {
  /**
   * Status of the order.
   *   - B  Backordered
   *   - C  Payment Approved
   *   - M  Pending Payment Approval
   *   - E  Edited by Customer Service
   *   - S  Shipped
   *   - D  Deposited (paid for)
   */
  public orderStatus = '';

  /**
   * Indicates if the order is locked by a Customer Service Representative.
   */
  public locked = false;

  /**
   * List of payments associated with this order.  Typically only 1.
   */
  public paymentInstructions: Array<PaymentInstruction> = [];

  /**
   * Shipping Address
   */
  public shippingAddress?: Address;

  /**
   * The [[StoreLocation]] to which this order will be delivered for PickupInStore
   */
  public storeLocationId?: string;

  /**
   * The date at which the order was placed
   */
  public datePlaced?: Date;

  /**
   * List of all items on the order.
   */
  public items: Array<OrderItem> = [];

  /**
   * The adjustments made against the whole order.
   */
  public adjustments: Array<Adjustment> = [];

  /**
   * The list of attributes associated with the item
   */
  public attributes: Array<OrderItemAttribute> = [];
}
