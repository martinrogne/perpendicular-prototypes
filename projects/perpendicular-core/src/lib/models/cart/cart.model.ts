import { CartItem } from './cartitem.model';
import { Adjustment } from './adjustment.model';
import { PaymentInstruction } from '../payment-instruction.model';
import { GiftOption } from './freegifts.model';
import { CartItemAttribute } from './cartitemattribute.model';
import { BaseOrder } from '../baseorder.model';

/**
 * This class represents a live shopping cart. It has information about which items are in the basket,
 * their totals, the breakdown in taxes and shipping and so on.
 */
export class Cart extends BaseOrder {
  /**
   * The items in the cart. Will always be non-null.
   */
  public items: Array<CartItem> = [];

  /**
   * Any chosen free-gift items that are part of your cart. Will always be non-null
   */
  public freeGiftOptions: Array<GiftOption> = [];

  /**
   * The adjustments made against the whole cart.
   */
  public adjustments: Array<Adjustment> = [];

  /**
   * List of promotion codes applied manually by customer to this cart.
   */
  public promotionCodes: Array<string> = [];

  /**
   * The shipping address nickName set for the basket
   */
  public shippingAddressNickName?: string;

  /**
   * The [[StoreLocation]] to which this cart will be delivered for PickupInStore
   */
  public storeLocationId?: string;

  /**
   * The payment instructions set on the basket, i.e. how is the customer paying for this
   */
  public paymentInstructions: Array<PaymentInstruction> = [];

  /**
   * The list of attributes associated with the cart itself
   */
  public attributes: Array<CartItemAttribute> = [];
}
