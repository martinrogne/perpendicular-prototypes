import { from as observableFrom, Subject } from 'rxjs';

import { take, switchMap, skip } from 'rxjs/operators';
import {
  DynamicKitConfiguration,
  IOrganizationRegistry,
  Organization,
  IOrganizationFactory,
  CARTSERVICE_BOPIS_DEFAULTLOCATIONID,
  CARTSERVICE_BOPIS_DEFAULTLAT,
  CARTSERVICE_BOPIS_DEFAULTLON,
  ICartService,
  IIdentityService,
  IProfileService,
  IPaymentInstructionService,
  INotificationService,
  ICartFactory,
  IProfileFactory,
  IStoreLocationService,
  IOrderService,
  IAnalyticsService,
  ICartProvider,
  Profile,
  UIMessage,
  UIMessageType,
  Cart,
  Identity,
  CartItem,
  Product,
  Address,
  PaymentMethod,
  PaymentInstruction,
  ShippingMode,
  Order,
  CartItemComponent,
  StoreLocation,
  GiftItem,
  IPaymentInstructionFactory,
} from 'perpendicular-core';

import { Injectable, Inject, Optional } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

/**
 * Implements the CartService.
 * The cart service is responsible for all manipulations of the Cart state.
 *
 * It is generally assumed that patching up state with new state, is
 * the responsibility of the Service, not the provider.
 * For now, though, we always reload the basket.
 *
 * Can be used by any component that needs to be notified when the cart changes, either due to
 * adjustments to the items of the cart, or due to the identity changing.
 *
 */
@Injectable()
export class CartService extends ICartService {
  // we keep a reference to the internal subject to hide the actual type from consumers.
  protected internalState: BehaviorSubject<Cart>;
  // a queue of pending loads
  protected queue: Subject<number>;
  protected lastCart: Cart;

  /**
   * Default constructor
   */
  constructor(
    public cartProvider: ICartProvider,
    public cartFactory: ICartFactory,
    public identityService: IIdentityService,
    public analytics: IAnalyticsService,
  ) {
    super();
    this.queue = new Subject<number>();
    this.queue
      .asObservable()
      .pipe(switchMap((x: number) => observableFrom(this.cartProvider.getCart())))
      .subscribe(
        (res: Cart) => {
          this.emitState(res);
        },
        err => {
        }
      );

    const defaultCart: Cart = this.cartFactory.newInstance();
    this.lastCart = defaultCart;

    this.internalState = new BehaviorSubject<Cart>(defaultCart);

    this.identityService.state.subscribe(x => {
      this.lastCart = defaultCart;
      this.internalState.next(this.lastCart);
      this.loadFromServer();
    });
  }

  /**
   * Returns the current cart state as an observable you can subscribe to.
   *
   * # Example
   * ````
   *    cartService.state.subscribe( newCart => {
   *        this.localCart = newCart; // will cause views to update
   *    });
   * ````
   */
  public get state(): Observable<Cart> {
    return this.internalState.asObservable();
  }

  /**
   * Adds one or more SKU's to the cart. The SKU's are added in one transaction, so if one fails, they all fail.
   *
   * Will update the **state** on success.
   * Will raise a notification in case of success or failure.
   *
   * The number of SKU's should match the number of quantities passed.
   * @param skuId either a single or array of catalog entry identifiers. (Example: *product.singleSkuCatalogEntryId*),
   *          or a GiftItem from a promotion reward option from ```cart.giftOptions```
   * @param qty quantity array.
   */
  public addToCart(item: string | string[] | GiftItem, qty?: number | number[]): void {
    if (item instanceof GiftItem) {
      // Handle gift items - we should split this out into its own method, perhaps
    } else {
      const ids = new Array<string>();
      const quantities = new Array<number>();

      if (item instanceof Array) {
        ids.push(...item);
      } else {
        ids.push(item);
      }

      if (qty !== undefined) {
        if (qty instanceof Array) {
          quantities.push(...qty);
        } else {
          quantities.push(qty);
        }
      }

      this.cartProvider.addToCart(ids, quantities).then(x => {
        this.loadFromServer();
      });
    }
  }

  /**
   * Add a dynamic kit to the cart
   * @param productId the product id of the dynamic kit product.
   * @param components: list of components in this kit, as (productId, quantity) tuples
   * @param configuration: the configuration that generated this dynamic kit.
   */
  public addDynamicKitToCart(productId: string, components: CartItemComponent[], configuration: DynamicKitConfiguration): void {
    // FIXME: Reimplement elsewhere...
  }

  /**
   * Replace a configuration on a cart item, by another
   * @param item CartItem containing the dynamic kit
   * @param components the new components
   * @param configuration the new configuraiton
   */
  public updateDynamicKitConfiguration(item: CartItem, components: CartItemComponent[], configuration: DynamicKitConfiguration): void {
    // FIXME: Reimplement elsewhere...
  }

  /**
   * Removes an order item from the cart.
   *
   * Will update the **state** on success.
   * Wont raise a notification in case of success.
   *
   * @param item the ```lineId``` of a cartItem or the CartItem itself.
   */
  public removeFromCart(item: CartItem): void {
    if (item.lineId) {
      this.cartProvider.removeFromCart(item.lineId).then(x => {
        this.loadFromServer();
      });
    }
  }

  /**
   * Changes the quantity of a specific line item. If you set the quantity to 0, the item will be deleted.
   *
   * FIXME: Consider renaming to changeQuantity, as adjust could give indication that it was *added* to
   *        the current quantity, rather than replacing it.
   * @param item the ```lineId``` of a cartItem or the CartItem itself.
   * @param qty the new quantity to set.
   */
  public adjustQuantity(item: CartItem, qty: number): void {
    if (item.lineId) {
      this.cartProvider.adjustQuantity(item.lineId, qty).then(x => {
        this.loadFromServer();
      });
    }
  }

  /**
   * Change the product bought for a given item. This may be used in scenarios where replacement
   * is useful, such as changing an item from one SKU to another in cart. For example, an SKU
   * of size 'S' to an SKU of size 'M'.
   * @param item either a cart items ```lineId``` or the cartItem itself.
   * @param newProductId the id of the new product id for the cartItem
   */
  public replaceItem(item: string | CartItem, newProductId: string): void {
    // FIXME: Simplify...
  }

  /**
   * Validates the current cart state, to see if it is ready for precheckout/checkout.
   */
  public isCartReadyForCheckout(): boolean {
    const result: boolean =
      this.lastCart.paymentInstructions.length > 0 &&
      !!this.lastCart.billingAddress &&
      (!!this.lastCart.shippingAddressNickName || !!this.lastCart.storeLocationId) &&
      !!this.lastCart.shippingMode;
    return result;
  }

  /**
   * Prepares the cart for checkout.
   * This is the place to do "expensive" operations, like reserving inventory in an external system, preparing the
   * external payment transaction etc, if the backing service does not do that on its own.
   */
  public precheckout(): Promise<string> {
    // FIXME: Simplify, perhaps... review what we do in other projects
    return Promise.resolve('');
  }

  /**
   * Performs the last step of the checkout process.
   *
   */
  public checkout(): Promise<Order> {
    // FIXME: Simplify
    return Promise.resolve(undefined as unknown as Order);
  }

  /**
   * Returns the set of billing addresses that are valid to use, with the current order.
   * For B2B this can be a set of addresses that come from the organization, rather then user making the
   * purchase. Therefore don't assume there will be an overlap between the users Profile addresses and
   * this set.
   *
   */
  public getAllowedBillingAddresses(): Promise<Array<Address>> {
    // FIXME: Move to a different service
    return Promise.resolve([]);
  }

  /**
   * Returns the set of payment options that are valid to use, with the current order.
   * For B2B this can be a set of addresses that come from the organization, rather then user making the
   * purchase. Therefore don't assume there will be an overlap between the users Profile addresses and
   * this set.
   *
   * This can be used when validating an order, after customer returns from punchout payment provider
   *
   * FIXME: Can we simplify the flow, so this isn't strictly necessary?
   * @param orderId the order.
   */
  public getAllowedPaymentInfoWithOrder(orderId: string): Promise<Array<PaymentMethod>> {
    // FIXME: Move to a different service
    return Promise.resolve([]);
  }

  /**
   * Returns the set of payment options that are valid to use, with the current order.
   * For B2B the payment options may vary based on basket contents, and individual organization trading agreements.
   *
   * @param orderId the order.
   */
  public getAllowedPaymentInfo(): Promise<Array<PaymentMethod>> {
    // FIXME: Move to a different service
    return Promise.resolve([]);
  }

  /**
   * Returns the set of shipping modes that are valid to use, with the current order.
   * For B2B this can be a set of modes that come from the contract, rather then general site on which the user is making the
   * purchase.
   */
  public getAllowedShippingModes(): Promise<Array<ShippingMode>> {
    // FIXME: Move to a different service
    return Promise.resolve([]);
  }

  /**
   * Resolves the active organization and returns it with address book info and
   * the like.
   *
   * If there is no injected OrganizationRegistry, it returns a promise that resolves to null;
   */
  public getActiveOrganization(): Promise<Organization> {
    // FIXME: Does this really belong here?
    return Promise.resolve(null as unknown as Organization);
  }

  /**
   * Returns the set of shipping addresses that are valid to use, with the current order.
   * For B2B this can be a set of addresses that come from the contract, rather then the user  making the
   * purchase.
   */
  public getAllowedShippingAddresses(): Promise<Array<Address>> {
    // FIXME: Move to a different service
    return Promise.resolve([]);
  }

  /**
   * Adds a promotion code to the current cart.
   * If the call fails, a notification will be raised with the error message.
   *
   * @param code the promotioncode to add
   */
  public addPromotionCode(code: string): void {
    // FIXME: Might be worth moving elsewhere...
  }

  /**
   * Removes a promotion code to the current cart.
   * If the call fails, a notification will be raised with the error message.
   *
   * @param code the promotioncode to remove
   */
  public removePromotionCode(code: string): void {
    // FIXME: Might be worth moving elsewhere
  }

  /**
   * Sets the carts shipping address
   */
  public setShippingAddress(address: Address): void {
    // FIXME: Simplify...
  }

  /**
   * This function will also set the ship mode id to the predefined pickup in store shipping mode.
   */
  public setStoreLocation(storelocation: StoreLocation): void {
    // FIXME: Simplify...
  }
  /**
   * Sets the carts billing address
   */
  public setBillingAddress(address: Address): void {
    // FIXME: Simplify...
  }

  /**
   * Sets the payment method to be used
   */
  public setPaymentMethod(paymentMethod: PaymentMethod): void {
    // FIXME: Simplify...
  }

  /**
   * set the shipping mode for the cart. If this forces a switch between Pickup In Store and Delivery, it will set some sane defaults for
   * either store location or shipping address.
   */
  public setShippingMode(shipModeId: string): void {
    // FIXME: Simplify...
  }

  /**
   * Resets cart to initial clean state.
   */
  public clearCart(): void {
    // FIXME: Simplify...
  }

  /**
   * Renews inventory status, price and address ID for order items. Remove order items that are out of stock.
   */
  public renewOrderItems(): void {
    // FIXME: Simplify...
  }

  protected resetCart(): void {
    this.lastCart = this.cartFactory.newInstance();
    this.loadFromServer();
  }

  protected emitState(c: Cart): void {
    this.internalState.next(c);
  }

  protected loadFromServer(): void {
    this.queue.next(new Date().getTime());
  }

  /**
   * Reloads the basket, or raises an error of some sort, based on the promise passed.
   */
  protected reloadAfterServiceCall(thePromise: Promise<Cart>, successMessage?: UIMessage): void {
    thePromise
      .then(dummyCart => {
        this.loadFromServer();
      })
      .catch(err => {});
  }

  /**
   * This will either add or delete-then-add a new payment instruction.
   */
  protected async upsertPaymentMethod(paymentMethodName: string): Promise<Cart> {
    // FIXME: Clean this up on implementation
    return Promise.resolve(undefined as unknown as Cart);
  }

  /**
   * This will set the billing address on the current payment instruction of the order.
   */
  protected async upsertBillingAddress(address: Address): Promise<void> {
    // FIXME: Clean this up on implementation
  }
}
