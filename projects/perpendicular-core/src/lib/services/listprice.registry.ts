import { Price } from '../models/price.model';
import { IRegistry } from './base.registry';

/**
 * A price lookup service of LIST prices. List prices, are the price that goods are typically displayed at.
 */
export abstract class IListPriceRegistry<PriceType extends Price = Price> extends IRegistry<PriceType> {
  /**
   * Returns a list price for the product shown.
   *
   * @param productId the SKU or product to get the price for.
   */
  public abstract getPrice(productId: string): Promise<PriceType>;
}
