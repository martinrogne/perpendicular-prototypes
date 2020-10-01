import { Inventory } from '../models/inventory.model';

/**
 * Backend interface to fetch inventory status for a specific product.
 *
 * FIXME: Must be enhanced to support getting physical store inventory
 */
export abstract class IInventoryProvider {
    /**
     * Returns the Inventory status for online sales of the specified product.
     * Note, only SKUs have inventory. Products themselves do not.
     *
     * @param a set of productId a SKU identifers from [[Product]] to look up inventory for.
     */
    public abstract getInventoryByProductId(productId: string[]): Promise<Inventory[]>;

    /**
     * Returns the Inventory status for pickup in store sales of the specified product.
     * Note, only SKUs have inventory. Products themselves do not.
     *
     * @param a set of productIds to look up inventory for
     * @param a set of storeLocationIds from [[StoreLocation]] to look up inventory data for.
     */
    public abstract getStoreLocationInventoryForProductId(productId: string[], storeLocationId: string[]): Promise<Inventory[]>;
}
