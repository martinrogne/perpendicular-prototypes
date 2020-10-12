import { Injectable, Inject, Optional } from '@angular/core';

import {
  ICartProvider,
  ICartFactory,
  CartItemComponent,
  IProductRegistry,
  Product,
  IDynamicKitConfigurationFactory,
  DynamicKitConfiguration,
  IAddressFactory,
  Cart,
  Address,
  PaymentMethod,
  ShippingMode,
  IShippingModeFactory,
  IPaymentMethodFactory,
  GiftItem,
  ProvidersWCSConfig,
  PERPENDICULAR_HTTP
} from 'perpendicular-core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * WebSphere Commerce specific implementation of the [[ICartProvider]]
 */
@Injectable()
export class WCSCartProvider extends ICartProvider {
  /**
   * Base path for the cart resource
   */
  protected basepath: string;
  /**
   * constructor
   */
  constructor(
    @Inject(PERPENDICULAR_HTTP) public http: HttpClient,
    public cartFactory: ICartFactory,
    public config: ProvidersWCSConfig,
    protected shipmodeFactory: IShippingModeFactory,
    protected paymentMethodFactory: IPaymentMethodFactory,
    @Optional() protected productRegistry: IProductRegistry,
    @Optional() protected dynamicKitConfigurationFactory: IDynamicKitConfigurationFactory,
    @Optional() protected addressFactory: IAddressFactory,
  ) {
    super();
    this.basepath = this.config.getWcsEndpointUrl('cart');
  }

  /**
   * Fetches the current users cart
   */
  public getCart(): Promise<Cart> {
    const url: string = this.getLoadCartURL();

    return this.http.get(url, {}).pipe(
      map(x => this.cartFactory.newInstanceFromJSON(x))
    ).toPromise();
  }

  /**
   * Adds a (set) of items to the cart.
   */
  public addToCart(skuId: string[], qty: number[]): Promise<Cart> {
    const url: string = this.getAddToCartURL();
    const payload: any = this.getAddToCartPayload(skuId, qty);

    return this.http.post(url, payload).pipe(
      map(x => new Cart())
    ).toPromise();
  }

  /**
   * Adds a dynamic kit to the cart, with its associated configuration
   */
  public addDynamicKitToCart(
    dynamicKitId: string,
    quantity: number,
    components: CartItemComponent[],
    configuration: DynamicKitConfiguration,
  ): Promise<Cart> {
    const url: string = this.getAddDynamicKitToCartURL();
    return this.getAddDynamicKitToCartPayload(dynamicKitId, quantity, components, configuration).then(payload => {
      return this.http.post(url, payload).pipe(
        map(x => undefined as unknown as Cart)
      ).toPromise();
    });
  }

  /**
   * Executes call to backend to update a dynamic kit component set and configuration string.
   */
  public updateDynamicKitConfiguration(
    orderItemId: string,
    dynamicKitId: string,
    quantity: number,
    components: CartItemComponent[],
    configuration: DynamicKitConfiguration,
  ): Promise<Cart> {
    const url: string = this.getUpdateDynamicKitConfigurationURL();
    return this.getUpdateDynamicKitConfigurationPayload(orderItemId, dynamicKitId, quantity, components, configuration).then(payload => {
      return this.http.put(url, payload).pipe(
        map(x => undefined as unknown as Cart)
      ).toPromise();
    });
  }

  /**
   * Removes a specific item from the cart
   */
  public removeFromCart(orderItemId: string): Promise<Cart> {
    const url: string = this.getRemoveFromCartURL();
    const payload: any = this.getRemoveFromCartPayload(orderItemId);

    return this.http.put(url, payload).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Updates, adds or removes the attributes for a set of items in cart. Attributes may be removed by
   * passing 'null', '' or null as the value
   */
  public updateCartItemAttribute(orderItemId: string, name: string, value: string, type: string): Promise<Cart> {
    const url: string = this.getUpdateCartItemAttributesURL();
    const payload: any = this.getUpdateCartItemAttributesPayload(orderItemId, name, value, type);

    return this.http.put(url, payload).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Updates, adds or removes the attributes for a set of items in cart. Attributes may be removed by
   * passing 'null', '' or null as the value
   */
  public updateCartAttribute(name: string, value: string, type: string): Promise<Cart> {
    const url: string = this.getUpdateCartItemAttributesURL();
    const payload: any = this.getUpdateCartAttributesPayload(name, value, type);

    return this.http.put(url, payload).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Updates the free gift selection for a specific set of gifts.
   * The backend expects the entire selection to be set at once.
   *
   * Pass an empty array to clear the selection.
   */
  public updateGiftSelection(orderId: string, giftOptionId: string, items: GiftItem[]): Promise<Cart> {
    const url: string = this.getUpdateRewardOptionURL();
    const payload: any = this.getUpdateRewardOptionPayload(orderId, giftOptionId, items);

    return this.http.put(url, payload).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Changes quantity of an cart item
   */
  public adjustQuantity(orderItemId: string, qty: number): Promise<Cart> {
    const url: string = this.getAdjustQuantityURL();
    const payload: any = this.getAdjustQuantityPayload(orderItemId, qty);

    return this.http.put(url, payload).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Performs pre-checkout actions, such as reserving inventory
   */
  public precheckout(orderId: string): Promise<string> {
    const url: string = this.getPrecheckoutURL();
    const payload: any = this.getPrecheckoutPayload(orderId);

    return this.http.put(url, payload).pipe(
      map(x => this.convertToOrderId(x))
    ).toPromise();
  }

  /**
   * Sets the store location to pickup the order at, to the specified number.
   *
   * @param orderItemIds the orderitems to affect
   * @param storeLocationId an identifier from a [[StoreLocation]] at which the cart will be picked update_order_item
   * @param shipModeId an identifier from a [[ShippingMode]] that supports pickup in store.
   */
  public setStoreLocationForPickup(orderItemIds: string[], storeLocationId: string, shipModeId: string): Promise<Cart> {
    const url: string = this.getUpdateShippingAddressURL();
    const payload: any = this.getUpdateStoreLocationForPickup(orderItemIds, storeLocationId, shipModeId);

    return this.http.put(url, payload).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Performs the final checkout step
   * FIXME: Should the notify things be set here, or on the server?
   */
  public checkout(cart: Cart): Promise<string> {
    const url: string = this.getCheckoutURL();
    const payload: any = this.getCheckoutPayload(cart);

    return this.http.put(url, payload).pipe(
      map(x => this.convertToOrderId(x))
    ).toPromise();
  }

  /**
   * Resets cart to pristine status
   */
  public clearCart(cart: Cart): Promise<Cart> {
    const url: string = this.getClearCartURL(cart);
    const payload: HttpParams = this.getClearCartParams(cart);

    return this.http.put(url, payload).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Recalculates the cart.
   */
  public calculate(cart: Cart): Promise<string> {
    const url: string = this.getCalculateURL(cart);
    const payload: any = this.getCalculatePayload(cart);

    return this.http.put(url, payload).pipe(
      map(x => this.convertToOrderId(x))
    ).toPromise();
  }

  /**
   * Based on current cart contents, fetch a list of the addresses that can be billed.
   *
   * FIXME: Why does this take an orderId?
   */
  public getAllowedBillingAddresses(orderId: string): Promise<Array<Address>> {
    const url: string = this.getAllowedBillingAddressURL(orderId);
    const params: HttpParams = this.getAllowedBillingAddressParams(orderId);

    return this.http.get(url, { params }).pipe(
      map(x => this.convertToAddressList()(x))
    ).toPromise();
  }

  /**
   * Based on current cart contents, fetch which payment methods are valid
   *
   * FIXME: Why does this take an orderId?
   */
  public getAllowedPaymentInfoWithOrder(orderId: string): Promise<Array<PaymentMethod>> {
    const url: string = this.getAllowedPaymentInfoURL();
    const params: HttpParams = this.getAllowedPaymentInfoParams(orderId);

    return this.http.get(url, { params }).pipe(
      map(x => this.paymentMethodFactory.newInstancesFromJSON(x))
    ).toPromise();
  }

  /**
   * Based on current cart contents, fetch which payment methods are valid
   */
  public getAllowedPaymentInfo(): Promise<Array<PaymentMethod>> {
    const url: string = this.getAllowedPaymentInfoURL();
    const params: HttpParams = this.getAllowedPaymentInfoParams('');

    return this.http.get(url, { params }).pipe(
      map(x => this.paymentMethodFactory.newInstancesFromJSON(x))
    ).toPromise();
  }

  /**
   * Based on current cart contents, fetch a list of the addresses that can be shipped to.
   *
   */
  public getAllowedShippingModes(orderId: string): Promise<Array<ShippingMode>> {
    const url: string = this.getAllowedShippingInfoURL();
    const params: HttpParams = this.getAllowedShippingInfoParams(orderId);

    return this.http.get(url, { params }).pipe(
      map(x => this.shipmodeFactory.newInstancesFromJSON(x))
    ).toPromise();
  }

  /**
   * Updates the shipping address and shipping mode of the cart, for non-pickup-in-store scenarios.
   */
  public setShippingInfo(orderItemIds: string[], addressId: string, shipModeId: string): Promise<Cart> {
    const url: string = this.getUpdateShippingAddressURL();
    const payload: any = this.getUpdateShippingInfoPayload(orderItemIds, addressId, shipModeId);

    return this.http.put(url, payload).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Based on current cart contents, fetch a list of the addresses that can be shipped to.
   *
   * FIXME: Why does this take an orderId?
   */
  public getAllowedShippingAddresses(orderId: string): Promise<Array<Address>> {
    const url: string = this.getAllowedShippingInfoURL();
    const params: HttpParams = this.getAllowedShippingInfoParams(orderId);

    return this.http.get(url, { params }).pipe(
      map(x => this.convertToShippingAddresses()(x))
    ).toPromise();
  }
  /**
   * Adds a promotion code to the current cart.
   */
  public addPromotionCode(code: string): Promise<Cart> {
    const url = this.getPromotionCodeUrl();
    const payload: any = this.getAddPromotionCodePayload(code);

    return this.http.post(url, payload).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Removes a promotion code from the current cart.
   */
  public removePromotionCode(code: string): Promise<Cart> {
    const params: HttpParams = new HttpParams();
    const url = this.getPromotionCodeUrl() + '/' + code;

    return this.http.delete(url, { params }).pipe(
      map(x => undefined as unknown as Cart)
    ).toPromise();
  }

  /**
   * Renews inventory status, price and address ID for order items. Remove order items that are out of stock.
   */
  public renewOrderItems(): Promise<string> {
    const url: string = this.getRenewOrderItemsURL();
    const payload: string = this.getRenewOrderItemsPayload();

    return this.http.post(url, payload).pipe(
      map(x => this.convertToOrderId(x))
    ).toPromise();
  }

  /**
   * Helper method to set parameters for fetching AllowedPaymentInfo information
   */
  protected getAllowedPaymentInfoParams(orderId: string): HttpParams {
    let p: HttpParams = new HttpParams();
    if (orderId) {
      p = p.append('orderId', '' + orderId);
    }
    return p;
  }

  /**
   * Helper method to set parameters for fetching AllowedShippingInfo information
   */
  protected getAllowedShippingInfoParams(orderId: string): HttpParams {
    let usp: HttpParams = new HttpParams();
    usp = usp.append('orderId', '' + orderId);
    return usp;
  }

  /**
   * Extracts the order id from a successful call to either calculate, precheckout and checkout
   */
  protected convertToOrderId(res: any): string {
    let result = '';

    if (res.orderId !== undefined && res.orderId != null && res.orderId.length > 0) {
      result = res.orderId;
    }

    return result;
  }

  protected convertToDynamicKitConfiguration(itemId: string): (res: any) => string {
    return res => {
      if (!!res && !!res.Order && !!res.Order[0].orderItem[0]) {
        const rawItem = res.Order[0].orderItem[0].orderItemConfiguration;
        // extract the original configuration element.
        const re = new RegExp('<OriginalConfig>(.*)</OriginalConfig>');
        const result = re.exec(rawItem);
        if (result !== null && result.length > 0) {
          return result[1];
        }
        return '';
      } else {
        return '';
      }
    };
  }

  /**
   * Deserializer for shipping addresses.
   */
  protected convertToShippingAddresses(): (res: any) => Array<Address> {
    return res => {
      const result = new Array<Address>();
      if (res && res.usableShippingAddress) {
        for (const addr of res.usableShippingAddress) {
          result.push(this.addressFactory.newInstanceFromJSON(addr));
        }
      }
      return result;
    };
  }

  /**
   * Deserializer for address information
   * FIXME: move to factory
   */
  protected convertToAddressList(): (res: any) => Array<Address> {
    return res => {
      const result = new Array<Address>();
      if (res && res.resultList) {
        for (const item of res.resultList) {
          if (item.billingAddresses) {
            for (const addr of item.billingAddresses) {
              result.push(this.addressFactory.newInstanceFromJSON(addr));
            }
          }
        }
      }

      return result;
    };
  }

  protected getAllowedBillingAddressParams(orderId: string): HttpParams {
    return new HttpParams();
  }

  protected getUpdateRewardOptionPayload(orderId: string, giftOptionId: string, items: GiftItem[]): any {
    const body: any = {
      orderId: '' + orderId,
      rewardOptionId: '' + giftOptionId,
      catEntryId: [],
      quantity: [],
    };

    if (!!items) {
      for (const item of items) {
        body.catEntryId.push(String(item.productId));
        body.quantity.push(String(item.quantity));
      }
    }
    return body;
  }
  protected getRemoveRewardOptionPayload(orderId: string, item: GiftItem): any {
    const body: any = {
      orderId: '' + orderId,
      rewardOptionId: '' + item.optionId,
      catEntryId: '' + item.productId,
      quantity: '0',
    };
    return body;
  }

  protected getPromotionCodeUrl(): string {
    return this.basepath + '/@self/assigned_promotion_code';
  }

  protected getUpdateRewardOptionURL(): string {
    return this.basepath + '/@self/update_reward_option';
  }

  protected getLoadCartURL(): string {
    return this.basepath + '/@self';
  }

  protected getAddToCartURL(): string {
    return this.basepath;
  }

  protected getAddDynamicKitToCartURL(): string {
    return this.basepath + '/@self/add_configuration_to_cart';
  }

  protected getUpdateDynamicKitConfigurationURL(): string {
    return this.basepath + '/@self/update_configuration_in_cart';
  }

  protected getRemoveFromCartURL(): string {
    return this.basepath + '/@self/delete_order_item';
  }

  protected getAdjustQuantityURL(): string {
    return this.basepath + '/@self/update_order_item';
  }

  protected getUpdateCartItemAttributesURL(): string {
    return this.basepath + '/@self/update_order_item';
  }

  protected getUpdateShippingAddressURL(): string {
    return this.basepath + '/@self/shipping_info';
  }

  protected getPrecheckoutURL(): string {
    return this.basepath + '/@self/precheckout';
  }

  protected getCheckoutURL(): string {
    return this.basepath + '/@self/checkout';
  }

  protected getCalculateURL(cart: Cart): string {
    if (cart) {
      return this.basepath + '/' + cart.id + '/calculate';
    } else {
      return this.basepath + '/calculate';
    }
  }

  protected getAllowedBillingAddressURL(orderId: string): string {
    return this.basepath + '/@self/usable_billing_address/' + orderId;
  }

  protected getAllowedPaymentInfoURL(): string {
    return this.basepath + '/@self/usable_payment_info';
  }

  protected getAllowedShippingInfoURL(): string {
    return this.basepath + '/@self/usable_shipping_info';
  }

  protected getUpdateDynamicKitConfigurationPayload(
    orderItemId: string,
    dynamicKitId: string,
    quantity: number,
    components: CartItemComponent[],
    configuration: DynamicKitConfiguration,
  ): Promise<any> {
    return this.resolveComponents(components).then(resolvedComponents => {
      const body: any = {
        orderItemId: '' + orderItemId,
      };

      body.ConfigXML = this.resolveDynamicKitConfig(dynamicKitId, quantity, components, configuration, resolvedComponents);

      // dynamic kit version do not require x_ prefixed
      body.calculationUsage = this.config.defaultCalculationCodes;

      return body;
    });
  }

  protected resolveComponents(components: CartItemComponent[]): Promise<Product[]> {
    const componentProducts: Promise<Product>[] = [];
    const invalidProducts: string[] = [];
    for (const component of components) {
      if (component.productId) {}
      componentProducts.push(
        this.productRegistry.getProduct(component.productId || '').then(p => {
          if (!p) {
            invalidProducts.push(component.productId || '');
          }
          return p;
        }),
      );
    }
    return Promise.all(componentProducts).then(x => {
      return Promise.resolve(x);
    });
  }

  protected resolveDynamicKitConfig(
    dynamicKitId: string,
    quantity: number,
    components: CartItemComponent[],
    configuration: DynamicKitConfiguration,
    products: Product[],
  ): string {
    const dkConfigJson = this.dynamicKitConfigurationFactory.serializeToJSON(configuration);

    let configXml = `<ConfiguratorBOM>
        <OriginalConfig>${JSON.stringify(dkConfigJson)}</OriginalConfig>
        <LineItem SKU="${dynamicKitId}" Quantity="${quantity}">
    `;
    for (const product of products) {
      const comp = components.find(y => y.productId === product.productId);

      if (comp !== undefined) {
        configXml += `<LineItem  SKU="${product.partNumber}"
                         Quantity="${comp.quantity}" component="true"/>`;
      }
    }
    configXml += `
            </LineItem>
        </ConfiguratorBOM>
        `;
    return configXml;
  }

  protected getAddDynamicKitToCartPayload(
    dynamicKitId: string,
    quantity: number,
    components: CartItemComponent[],
    configuration: DynamicKitConfiguration,
  ): Promise<any> {
    return this.resolveComponents(components).then(resolvedComponents => {
      const body: any = {
        catEntryId: '' + dynamicKitId,
        quantity: '' + quantity,
      };

      body.ConfigXML = this.resolveDynamicKitConfig(dynamicKitId, quantity, components, configuration, resolvedComponents);

      // the dynamic kit versions expect values not to have x_ prefixed.
      body.calculationUsage = this.config.defaultCalculationCodes;

      return body;
    });
  }

  protected getAddPromotionCodePayload(code: string): any {
    return { promoCode: code };
  }

  protected getAddToCartPayload(skuId: string[], qty: number[]): any {
    const body: any = {
      orderItem: [],
    };

    for (const skuIdx in skuId) {
      if (!skuId.hasOwnProperty(skuIdx)) {
        continue;
      }
      body.orderItem.push({ productId: '' + skuId[skuIdx], quantity: '' + qty[skuIdx] });
    }
    body.x_calculateOrder = 'Y';
    body.x_calculationUsage = this.config.defaultCalculationCodes;
    return body;
  }

  protected getRemoveFromCartPayload(orderItemId: string): any {
    const body: any = {
      orderItemId: '' + orderItemId,
    };
    body.x_calculateOrder = 'Y';
    body.x_calculationUsage = this.config.defaultCalculationCodes;

    // wc9 / wc8.0.4.19+ compatibility fix.
    body.calculateOrder = '1';
    body.calculationUsage = this.config.defaultCalculationCodes;

    return body;
  }

  protected getUpdateCartItemAttributesPayload(
    orderItemId: string,
    attributeName: string,
    attributeValue: string,
    attributeType: string,
  ): any {
    const attr: any = [
      {
        attributeName,
        attributeValue,
        attributeType,
      },
    ];

    const body: any = {
      orderItem: [
        {
          orderItemId: '' + orderItemId,
          orderItemExtendAttribute: attr,
        },
      ],
    };
    return body;
  }

  protected getUpdateCartAttributesPayload(attributeName: string, attributeValue: string, attributeType: string): any {
    const attr: any = [
      {
        attributeName,
        attributeValue,
        attributeType,
      },
    ];

    const body: any = {
      orderExtendAttribute: attr,
    };
    return body;
  }

  protected getAdjustQuantityPayload(orderItemId: string, qty: number): any {
    const body: any = {
      orderItem: [
        {
          orderItemId: '' + orderItemId,
          quantity: '' + qty,
        },
      ],
    };
    body.x_calculateOrder = 'Y';
    body.x_calculationUsage = this.config.defaultCalculationCodes;

    return body;
  }

  protected getUpdateShippingInfoPayload(orderItemIds: string[], addressId: string, shipModeId: string): any {
    const body: any = {
      orderId: '.',
      orderItem: [],
    };
    for (const orderItemIdx in orderItemIds) {
      if (!orderItemIds.hasOwnProperty(orderItemIdx)) {
        continue;
      }

      const oi: any = {
        orderItemId: '' + orderItemIds[orderItemIdx],
        physicalStoreId: null,
      };
      if (!!addressId) {
        oi.addressId = String(addressId);
      }

      if (!!shipModeId) {
        oi.shipModeId = String(shipModeId);
      }
      body.orderItem.push(oi);
    }
    body.x_calculationUsage = this.config.defaultCalculationCodes;
    // WCS 9.0.1.2 compatibility
    body.x_calculateOrder = '1';

    return body;
  }

  protected getUpdateStoreLocationForPickup(orderItemIds: string[], storeLocationId: string, shipModeId: string): any {
    const body: any = {
      orderId: '.',
      orderItem: [],
    };
    for (const orderItemIdx in orderItemIds) {
      if (!orderItemIds.hasOwnProperty(orderItemIdx)) {
        continue;
      }

      const oi: any = {
        orderItemId: '' + orderItemIds[orderItemIdx],
      };
      if (!!storeLocationId) {
        oi.physicalStoreId = String(storeLocationId);
      }
      if (!!shipModeId) {
        oi.shipModeId = String(shipModeId);
      }
      body.orderItem.push(oi);
    }
    body.x_calculationUsage = this.config.defaultCalculationCodes;
    // WCS 9.0.1.2 compatibility
    body.x_calculateOrder = '1';
    return body;
  }

  protected getPrecheckoutPayload(orderId: string): any {
    const body: any = {
      orderId: '' + orderId,
    };
    body.x_calculateOrder = 'true';
    body.x_calculationUsage = this.config.defaultCalculationCodes;

    return body;
  }

  protected getCheckoutPayload(cart: Cart): any {
    const body: any = {
      orderId: '' + cart.id,
      notifyMerchant: this.config.notifyMerchantOnCheckout ? '1' : '0',
      notifyOrderSubmitted: this.config.notifyOrderSubmitted ? '1' : '0',
      notifyShopper: this.config.notifyShopperOnCheckout ? '1' : '0',
      purchaseorder_id: '',
    };

    return body;
  }

  protected getCalculatePayload(cart: Cart): any {
    const calcUsages = this.config.defaultCalculationCodes.split(',').map(x => Number(x));
    let orderId = '.';
    if (cart && cart.id) {
      orderId = cart.id;
    }
    const body: any = {
      orderId,
      calculationUsageId: calcUsages,
    };

    return body;
  }

  protected getClearCartURL(cart: Cart): string {
    return this.config.getWcsEndpointUrl('cart') + `/${cart.id}/cancel_order`;
  }

  protected getClearCartParams(cart: Cart): HttpParams {
    return new HttpParams();
  }

  protected getRenewOrderItemsURL(): string {
    return this.basepath + '/@self/renew_order_items';
  }

  protected getRenewOrderItemsPayload(): any {
    const body: any = {
      orderId: ['.'],
    };
    return body;
  }
}
