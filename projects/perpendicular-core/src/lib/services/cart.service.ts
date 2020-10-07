import { Observable } from 'rxjs';
import { Cart } from '../models/cart/cart.model';
import { GiftItem } from '../models/cart/freegifts.model';
import { CartItemComponent } from '../models/cart/cartitemcomponent.model';
import { DynamicKitConfiguration } from '../models/dynamic-kit-configuration.model';
import { CartItem } from '../models/cart/cartitem.model';
import { Order } from '../models/order.model';
import { Address } from '../models/address.model';
import { PaymentMethod } from '../models/payment-method.model';
import { StoreLocation } from '../models/storelocation.model';
import { PaymentInstruction } from '../models/payment-instruction.model';
import { ShippingMode } from '../models/shippingmode.model';

/**
 * This service maintains the current basket of the customer.
 *
 * Components can get updates by subscribing to its "state" field.
 */
export abstract class ICartService<Z extends Cart = Cart> {
  /**
   * Provides state updates to external components.
   */
  public get state(): Observable<Z> {
    throw new Error('Not implemented');
  }

  /**
   * Add an item to cart
   * @param item either a product id, a set of product ids, or a gift item
   * @param qty the number of items to add (except if its a gift item)
   */
  public abstract addToCart(item: string | string[] | GiftItem, qty?: number | number[]): void;

  /**
   * Add a dynamic kit to the cart
   * @param item the product id of the dynamic kit product.
   * @param components: list of components in this kit, as (productId, quantity) tuples
   * @param configuration: the original configuration
   */
  public abstract addDynamicKitToCart(productId: string, components: CartItemComponent[], configuration: DynamicKitConfiguration): void;

  /**
   * Replace a configuration on a cart item, by another
   * @param item CartItem or lineId of cart item
   * @param components the new components
   * @param configuration the new configuraiton
   */
  public abstract updateDynamicKitConfiguration(
    item: string | CartItem,
    components: CartItemComponent[],
    configuration: DynamicKitConfiguration,
  ): void;

  /**
   * Remove an item from cart
   * @param item either a cart items ```lineId``` or the cartItem itself, or a previously selected free gift.
   */
  public abstract removeFromCart(item: string | CartItem | GiftItem): void;

  /**
   * Change quantity of item in cart
   * @param item either a cart items ```lineId``` or the cartItem itself.
   */
  public abstract adjustQuantity(item: string | CartItem, qty: number): void;

  /**
   * Change the product bought for a given item. This may be used in scenarios where replacement
   * is useful, such as changing an item from one SKU to another in cart. For example, an SKU
   * of size 'S' to an SKU of size 'M'.
   * @param item either a cart items ```lineId``` or the cartItem itself.
   * @param newProductId the id of the new product id for the cartItem
   */
  public abstract replaceItem(item: string | CartItem, newProductId: string): void;

  /**
   * Do a precheckout / order prepare
   */
  public abstract precheckout(): Promise<string>;

  /**
   * Do a checkout / sumbit order
   * Returns the completed order on success.
   *
   * Inspect this order to see if any of the payment instructions require a punchout to finalize processing.
   */
  public abstract checkout(): Promise<Order>;

  /**
   * Sets the carts shipping address
   */
  public abstract setShippingAddress(address: Address): void;

  /**
   * Sets the carts billing address
   */
  public abstract setBillingAddress(address: Address): void;

  /**
   * Sets the payment method to be used
   */
  public abstract setPaymentMethod(paymentMethod: PaymentMethod): void;

  /**
   * Sets the carts shipping mode
   */
  public abstract setShippingMode(shipModeId: string): void;

  /**
   * If the shipping mode is a Pickup In Store shipping mode, then the shipping address will be the address of the store.
   * Use this function to mark which [[StoreLocation]] it will be shipped to.
   *
   * Note, this will clear any existing shipping address selection.
   */
  public abstract setStoreLocation(storelocation: StoreLocation): void;

  /**
   * Validates the current cart state, to see if it is ready for precheckout/checkout.
   */
  public abstract isCartReadyForCheckout(): boolean;

  /**
   * Get the billing addresses that are allowed to be used by this customer for this cart.
   */
  public abstract getAllowedBillingAddresses(): Promise<Array<Address>>;

  /**
   * Get the payment methods that are allowed to be used by this customer for a different order.
   */
  public abstract getAllowedPaymentInfoWithOrder(orderId: string): Promise<Array<PaymentMethod>>;

  /**
   * Get the payment methods that are allowed to be used by this customer for this cart.
   */
  public abstract getAllowedPaymentInfo(): Promise<Array<PaymentMethod>>;

  /**
   * Get the shipping modes that are allowed to be used by this customer for this cart.
   */
  public abstract getAllowedShippingModes(): Promise<Array<ShippingMode>>;

  /**
   * Get the shipping addresses that are allowed to be used by this customer for this cart.
   */
  public abstract getAllowedShippingAddresses(): Promise<Array<Address>>;

  /**
   * Adds a promotion code to the cart
   */
  public abstract addPromotionCode(code: string): void;

  /**
   * Removes a promotion code to the cart
   */
  public abstract removePromotionCode(code: string): void;

  /**
   * Resets cart to initial clean state.
   */
  public abstract clearCart(): void;

  /**
   * Renews inventory status, price and address ID for order items. Remove order items that are out of stock.
   */
  public abstract renewOrderItems(): void;
}
