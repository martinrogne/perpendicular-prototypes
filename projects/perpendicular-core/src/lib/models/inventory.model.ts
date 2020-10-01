import { BaseModel } from './base.model';

/**
 *   Represents an inventory record for a SKU. A SKU is a sellable version of a Product, defined by having its DefiningAttributes filled in.
 */
export class Inventory extends BaseModel {
  /**
   * ID of SKU that this inventory relates to
   */
  public productId?: string;

  /**
   * inventory status. Can be one of
   *    - Available (can be shipped right now)
   *    - Unavailable  (can never be shipped)
   *    - Backorderable (can be shipped, but with delay)
   *    - Future (product not released for sale yet, but preorders can be placed.)
   */
  public status?: string;

  /**
   * If set, this [[Inventory]] record represents stock in a physical store location, usually for Pickup In Store
   * scenarios. Otherwise the record is for the current Online store.
   */
  public storeLocationId?: string;

  /**
   * Approximate quantity left. Note, this value can be a cached value, and should not be thought of as authoritive.
   * Only the [[ICartService]] precheckout step can authoritively assert that a cart can be fulfilled.
   *
   * That being said, this number should be accurate enough for 98% of all purchases.
   */
  public approximateQuantity?: number;

  /**
   * Approximate availability date, in case of backorderability. Should reflect when user can expect to get the goods.
   * if he pre-orders it now.
   */
  public approximateAvailabilityDate?: Date;

  /**
   * Convenience function to return if product is shippable.
   */
  public get isAvailable(): boolean {
    if (this.status === 'Available') {
      return true;
    }

    return false;
  }

  /**
   * Convenience function to return if this inventory is for online purchases.
   */
  public get isOnlineInventory(): boolean {
    return !this.storeLocationId;
  }

  /**
   * If you do not want to show the exact quantity, you can override this property,
   * and return the range instead, or a traffic light, or some
   * other construct.
   */
  public get approximateQuantityDisplay(): string {
    return String(this.approximateQuantity);
  }
}
