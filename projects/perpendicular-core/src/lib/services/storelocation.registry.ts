import { StoreLocation } from '../models/storelocation.model';
import { IRegistry } from './base.registry';

/**
 * Stateless UI service to cache lookups of Stores (typically for Pickup In Store scenarios)
 */
export abstract class IStoreLocationRegistry<StoreLocationType extends StoreLocation = StoreLocation> extends IRegistry<StoreLocationType> {
  /**
   * Looks up a single store, based on its id
   */
  public abstract getByStoreId(id: string): Promise<StoreLocationType>;
}
