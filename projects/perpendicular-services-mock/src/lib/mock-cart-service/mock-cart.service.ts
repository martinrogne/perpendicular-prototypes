import { Injectable } from '@angular/core';
import {
  Address,
  CartItem,
  GiftItem,
  ICartService,
  Order,
  PaymentInstruction,
  PaymentMethod,
  ShippingMode,
  StoreLocation,
  Cart,
  IShippingModeFactory,
  IPaymentMethodFactory,
  IAddressFactory,
  ICartFactory,
  IOrderService,
  CartItemComponent,
  DynamicKitConfiguration,
} from 'perpendicular-core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ModifiableState } from '../testutils/utils';

/**
 * Mock version of the [[ICartService]].
 *
 * All functions that return void will not do anything.
 *
 * # Test data
 * State will contain an empty basket
 * - The `isCartReadyForCheckout` function returns false
 * - `getAllowedShippingModes` will return two dummy shipping modes ('SHIPMODE1' and 'BOPIS')
 * - `getAllowedBillingAddresses` will return two addresses, 1 of which is primary
 * - `getAllowedShippingAddresses` will return two addresses, 1 of which is primary
 * - `getAllowedPaymentInfo` will return two payment methods, 1 of which is punchout
 * - `checkout` will return an order with a shipping and billing address and payment method set to punchout
 * - `precheckout` will return '1000'
 * You can emit new cart states by casting to this class, and use the
 * `emitNewState` helper.
 */
@Injectable()
export class MockCartService extends ICartService implements ModifiableState<Cart> {
  protected internalState: BehaviorSubject<Cart>;

  /**
   * See [[ICartService]]
   */
  public get state(): Observable<Cart> {
    return this.internalState.asObservable();
  }

  /**
   * See [[ICartService]]
   */
  public get currentCart(): Observable<Cart> {
    return this.internalState.asObservable();
  }

  /**
   * See [[ICartService]]
   */
  constructor(
    public shippingModeFactory: IShippingModeFactory,
    public paymentMethodFactory: IPaymentMethodFactory,
    public addressFactory: IAddressFactory,
    public orderService: IOrderService,
    public cartFactory: ICartFactory,
  ) {
    super();
    this.internalState = new BehaviorSubject(cartFactory.newInstance());

    spyOn(this as ICartService, 'addToCart').and.callThrough();
    spyOn(this as ICartService, 'removeFromCart').and.callThrough();
    spyOn(this as ICartService, 'adjustQuantity').and.callThrough();
    spyOn(this as ICartService, 'replaceItem').and.callThrough();
    spyOn(this as ICartService, 'precheckout').and.callThrough();
    spyOn(this as ICartService, 'checkout').and.callThrough();
    spyOn(this as ICartService, 'setShippingAddress').and.callThrough();
    spyOn(this as ICartService, 'setBillingAddress').and.callThrough();
    spyOn(this as ICartService, 'setShippingMode').and.callThrough();
    spyOn(this as ICartService, 'setStoreLocation').and.callThrough();
    spyOn(this as ICartService, 'isCartReadyForCheckout').and.callThrough();
    spyOn(this as ICartService, 'getAllowedBillingAddresses').and.callThrough();
    spyOn(this as ICartService, 'getAllowedPaymentInfoWithOrder').and.callThrough();
    spyOn(this as ICartService, 'getAllowedPaymentInfo').and.callThrough();
    spyOn(this as ICartService, 'getAllowedShippingModes').and.callThrough();
    spyOn(this as ICartService, 'getAllowedShippingAddresses').and.callThrough();
    spyOn(this as ICartService, 'addPromotionCode').and.callThrough();
    spyOn(this as ICartService, 'removePromotionCode').and.callThrough();
    spyOn(this as ICartService, 'addDynamicKitToCart').and.callThrough();
    spyOn(this as ICartService, 'updateDynamicKitConfiguration').and.callThrough();
    spyOn(this as ICartService, 'clearCart').and.callThrough();
    spyOn(this as ICartService, 'renewOrderItems').and.callThrough();
    spyOn(this as ICartService, 'setPaymentMethod').and.callThrough();
  }

  /**
   * See [[ICartService]]
   */
  public addToCart(item: string | string[] | GiftItem, qty?: number | number[]): void {}
  /**
   * See [[ICartService]]
   */
  public removeFromCart(item: string | GiftItem | CartItem): void {}
  /**
   * See [[ICartService]]
   */
  public adjustQuantity(item: string | CartItem, qty: number): void {}
  /**
   * See [[ICartService]]
   */
  public replaceItem(item: string | CartItem, newProductId: string): void {}

  /**
   * Returns a fake order id, which will return data in the order service.
   */
  public precheckout(): Promise<string> {
    return Promise.resolve('1000');
  }

  /**
   * Returns a fake order
   */
  public checkout(): Promise<Order> {
    return this.orderService.getOrder('1000');
  }

  /**
   * See [[ICartService]]
   */
  public setShippingAddress(address: Address): void {}

  /**
   * See [[ICartService]]
   */
  public setBillingAddress(address: Address): void {}

  /**
   * See [[ICartService]]
   */
  public setPaymentMethod(paymentMethod: PaymentMethod): void {}

  /**
   * See [[ICartService]]
   */
  public getCurrentBillingAddress(): Address {
    const a1 = this.createTestAddress('1');
    a1.id = '1001';
    a1.isShippingAddress = true;
    a1.isBillingAddress = true;
    a1.isPrimary = true;
    return a1;
  }

  /**
   * See [[ICartService]]
   */
  public setShippingMode(shipModeId: string): void {}
  /**
   * See [[ICartService]]
   */
  public setStoreLocation(storelocation: StoreLocation): void {}
  /**
   * See [[ICartService]]
   */
  public getCurrentPaymentInstructions(): PaymentInstruction[] {
    return [];
  }
  /**
   * See [[ICartService]]
   */
  public isCartReadyForCheckout(): boolean {
    return false;
  }

  /**
   * See [[ICartService]]
   */
  public getAllowedBillingAddresses(): Promise<Address[]> {
    return this.getAllowedShippingAddresses();
  }

  /**
   * See [[ICartService]]
   */
  public getAllowedPaymentInfoWithOrder(orderId: string): Promise<PaymentMethod[]> {
    return this.getAllowedPaymentInfo();
  }

  /**
   * See [[ICartService]]
   */
  public getAllowedPaymentInfo(): Promise<PaymentMethod[]> {
    const p1 = this.createTestPaymentMethod(true);
    const p2 = this.createTestPaymentMethod(false);
    return Promise.resolve([p1, p2]);
  }

  /**
   * See [[ICartService]]
   */
  public getAllowedShippingModes(): Promise<ShippingMode[]> {
    const s1 = this.createTestShippingMode(false);
    const s2 = this.createTestShippingMode(true);

    return Promise.resolve([s1, s2]);
  }

  /**
   * See [[ICartService]]
   */
  public getAllowedShippingAddresses(): Promise<Address[]> {
    const a1 = this.createTestAddress('1');
    a1.id = '1001';
    a1.isShippingAddress = true;
    a1.isBillingAddress = true;
    a1.isPrimary = true;

    const a2 = this.createTestAddress('2');
    a2.id = '1002';
    a2.isShippingAddress = true;
    a1.isBillingAddress = true;
    a2.isPrimary = false;

    return Promise.resolve([a1, a2]);
  }

  public addDynamicKitToCart(item: string, components: CartItemComponent[], configuration: DynamicKitConfiguration): void {}

  public updateDynamicKitConfiguration(
    item: string | CartItem,
    components: CartItemComponent[],
    configuration: DynamicKitConfiguration,
  ): void {}

  /**
   * See [[ICartService]]
   */
  public addPromotionCode(code: string): void {}

  /**
   * See [[ICartService]]
   */
  public removePromotionCode(code: string): void {}

  /**
   * See [[ICartService]]
   */
  public clearCart(): void {}

  /**
   * See [[ICartService]]
   */
  public renewOrderItems(): void {}

  /**
   * Unit test function to emit an updated cart state
   */
  public emitNewState(cart: Cart): void {
    this.internalState.next(cart);
  }

  /**
   * See [[ICartService]]
   */
  protected createTestPaymentMethod(isPunchOut: boolean): PaymentMethod {
    const p = this.paymentMethodFactory.newInstance();
    p.description = isPunchOut ? 'Visa Punchout' : 'Invoice';
    p.paymentMethodName = isPunchOut ? 'SimplePunchout' : 'PayLater';
    return p;
  }

  /**
   * See [[ICartService]]
   */
  protected createTestShippingMode(isBopis: boolean): ShippingMode {
    const s = this.shippingModeFactory.newInstance();

    s.amount = 100;
    s.carrier = 'PostNord';
    s.description = isBopis ? 'Pickup In Store' : 'Ordinary Parcel Service';
    s.shipModeCode = isBopis ? 'PickupInStore' : 'SHIPMODE1';
    s.id = isBopis ? '1' : '2';
    return s;
  }

  /**
   * See [[ICartService]]
   */
  protected createTestAddress(suffix: string): Address {
    const a1 = this.addressFactory.newInstance();
    a1.address1 = 'Test street ' + suffix;
    a1.city = 'Copenhagen';
    a1.country = 'DK';
    a1.email = 'testemail' + suffix + '@demodomain.nop';
    a1.firstName = 'Test firstname ' + suffix;
    a1.lastName = 'lastname ' + suffix;
    a1.nickName = 'nickName' + suffix;
    a1.phone = '33 44 85 8' + suffix;
    a1.state = 'Sjaelland';
    a1.zip = '100' + suffix;

    return a1;
  }
}
