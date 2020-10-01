import { Inventory } from '../models/inventory.model';
import { IRegistry } from './base.registry';

export abstract class IInventoryRegistry<InventoryType extends Inventory = Inventory> extends IRegistry<InventoryType> {
  /**
   * Must return inventory status for the provided productId
   */
  public abstract getOnlineInventory(productId: string): Promise<InventoryType>;

  /**
   * Returns inventory status for a given product, in a physical store location. Primarily for Pickup In store
   * scenarios.
   */
  public abstract getStoreLocationInventory(productId: string, storeLocationId: string): Promise<InventoryType>;
}
