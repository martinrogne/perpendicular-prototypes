/**
 * Shopping Cart hooks for backend.
 */
import { Cart } from '../models/cart/cart.model';
import { CartItemComponent } from '../models/cart/cartitemcomponent.model';
import { DynamicKitConfiguration } from '../models/dynamic-kit-configuration.model';
import { GiftItem } from '../models/cart/freegifts.model';
import { Address } from '../models/address.model';
import { PaymentMethod } from '../models/payment-method.model';
import { ShippingMode } from '../models/shippingmode.model';


export abstract class ICartProvider {
  /**
   * Executes call to backend to fetch cart and transform the result to match the Cart model
   */
  public abstract getCart(): Promise<Cart>;

  /**
   * Executes call to backend to add item to cart, and return the modified cart.
   */
  public abstract addToCart(skuId: string[], qty: number[]): Promise<Cart>;

  /**
   * Executes call to backend to add item to cart, and return the modified cart.
   */
  public abstract addDynamicKitToCart(
    dynamicKitId: string,
    quantity: number,
    components: CartItemComponent[],
    configuration: DynamicKitConfiguration,
  ): Promise<Cart>;

  /**
   * Executes call to backend to update a dynamic kit component set and configuration string.
   */
  public abstract updateDynamicKitConfiguration(
    orderItemId: string,
    dynamicKitId: string,
    quantity: number,
    components: CartItemComponent[],
    configuration: DynamicKitConfiguration,
  ): Promise<Cart>;

  /**
   * Executes call to backend to remove an item from cart, and return the modified cart.
   */
  public abstract removeFromCart(orderItemId: string): Promise<Cart>;

  /**
   * Executes call to backend to update or set the attribute on a given item. It may be called with a 'null' or empty
   * value to indicate removal.
   */
  public abstract updateCartItemAttribute(orderItemId: string, name: string, value: string, type: string): Promise<Cart>;

  /**
   * Executes call to backend to update or set the attribute on the order. It may be called with a 'null' or empty
   * value to indicate removal.
   */
  public abstract updateCartAttribute(name: string, value: string, type: string): Promise<Cart>;

  /**
   * Executes call to change quantity of an order item, and return the modified cart.
   */
  public abstract adjustQuantity(orderItemId: string, qty: number): Promise<Cart>;

  /**
   * Sets a non-pickup-in-store shipping mode.
   * Executes call to update the shipping address of a set of order items to a new address id
   */
  public abstract setShippingInfo(orderItemIds: string[], addressId: string, shipModeId: string): Promise<Cart>;

  /**
   * Sets a pickup-in-store shipping mode.
   * Sets the store location to pickup the order at, to the specified number.
   */
  public abstract setStoreLocationForPickup(orderItemIds: string[], storeLocationId: string, shipModeId: string): Promise<Cart>;

  /**
   * Prepares the order for checkout, calculating taxes and shipping, reserving inventory etc
   */
  public abstract precheckout(orderId: string): Promise<string>;

  /**
   * Resets cart to pristine status
   */
  public abstract clearCart(cart: Cart): Promise<Cart>;

  /**
   * Finalizes order, and sends notifications to different participants.
   * Returns the order id of the submitted order.
   */
  public abstract checkout(cart: Cart): Promise<string>;

  /**
   * Recalculates all amount on the order
   */
  public abstract calculate(cart: Cart): Promise<string>;

  /**
   * Updates the free gift selection for a specific set of gifts.
   * The backend expects the entire selection to be set at once.
   *
   * @param orderId the order to which the gift item is associated
   * @param giftOptionId the id of the gift option to update.
   * @param items the GiftItems that are supposed to be left, after this function is done.
   */
  public abstract updateGiftSelection(orderId: string, giftOptionId: string, item: GiftItem[]): Promise<Cart>;

  /**
   * Fetches the set of usable billing addresses that can be used for the specified order
   */
  public abstract getAllowedBillingAddresses(orderId: string): Promise<Array<Address>>;

  /**
   * Fetches the set of usable payment methods that can be used for the specified order
   */
  public abstract getAllowedPaymentInfoWithOrder(orderId: string): Promise<Array<PaymentMethod>>;

  /**
   * Fetches the set of usable payment methods that can be used
   */
  public abstract getAllowedPaymentInfo(): Promise<Array<PaymentMethod>>;

  /**
   * Fetches the set of usable shipping methods that can be used for the specified order
   */
  public abstract getAllowedShippingModes(orderId: string): Promise<Array<ShippingMode>>;

  /**
   * Fetches the set of usable shipping addresses that can be used for the specified order
   */
  public abstract getAllowedShippingAddresses(orderId: string): Promise<Array<Address>>;

  /**
   * adds a promotion code to the basket. If the promotion code is invalid, the promise will reject.
   */
  public abstract addPromotionCode(code: string): Promise<Cart>;

  /**
   * Removes a promotion code from the basket
   */
  public abstract removePromotionCode(code: string): Promise<Cart>;

  /**
   * Renews inventory status, price and address ID for order items. Remove order items that are out of stock
   */
  public abstract renewOrderItems(): Promise<string>;
}
