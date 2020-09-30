import { Injectable, isDevMode } from '@angular/core';
import {
  Address,
  CartItem,
  CartItemComponent,
  DynamicKitConfiguration,
  GiftItem,
  ICartService,
  Order,
  PaymentInstruction, PaymentMethod, ShippingMode, StoreLocation
} from 'perpendicular-core';

@Injectable({
  providedIn: 'root'
})
export class CartService extends ICartService {
  constructor() {
    super();
  }

  public addDynamicKitToCart(productId: string, components: CartItemComponent[], configuration: DynamicKitConfiguration): void {
  }

  public addPaymentInstruction(paymentInstruction: PaymentInstruction): void {
  }

  public addPromotionCode(code: string): void {
  }

  public addToCart(item: string | string[] | GiftItem, qty?: number | number[]): void {
  }

  public adjustQuantity(item: string | CartItem, qty: number): void {
  }

  public checkout(): Promise<Order> {
    return Promise.resolve(undefined as unknown as Order);
  }

  public clearCart(): void {
  }

  public clearPaymentInstructions(): void {
  }

  public getAllowedBillingAddresses(): Promise<Array<Address>> {
    return Promise.resolve([]);
  }

  public getAllowedPaymentInfo(): Promise<Array<PaymentMethod>> {
    return Promise.resolve([]);
  }

  public getAllowedPaymentInfoWithOrder(orderId: string): Promise<Array<PaymentMethod>> {
    return Promise.resolve([]);
  }

  public getAllowedShippingAddresses(): Promise<Array<Address>> {
    return Promise.resolve([]);
  }

  public getAllowedShippingModes(): Promise<Array<ShippingMode>> {
    return Promise.resolve([]);
  }

  public isCartReadyForCheckout(): boolean {
    return false;
  }

  public precheckout(): Promise<string> {
    return Promise.resolve('');
  }

  public removeFromCart(item: string | CartItem | GiftItem): void {
  }

  public removePromotionCode(code: string): void {
  }

  public renewOrderItems(): void {
  }

  public replaceItem(item: string | CartItem, newProductId: string): void {
  }

  public setBillingAddress(address: Address): void {
  }

  public setPaymentMethod(paymentMethod: PaymentMethod): void {
  }

  public setShippingAddress(address: Address): void {
  }

  public setShippingMode(shipModeId: string): void {
  }

  public setStoreLocation(storelocation: StoreLocation): void {
  }

  public updateDynamicKitConfiguration(item: string | CartItem,
                                       components: CartItemComponent[],
                                       configuration: DynamicKitConfiguration): void {
  }
}

