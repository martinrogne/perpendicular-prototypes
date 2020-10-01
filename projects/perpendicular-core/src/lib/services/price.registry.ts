import { Price } from '../models/price.model';
import { IRegistry } from './base.registry';

/**
 * A price lookup service of OFFER prices. Offer prices, are the price that goods are sold at.
 */
export abstract class IPriceRegistry<PriceType extends Price = Price> extends IRegistry<PriceType> {
  /**
   * Returns an offer price for the product shown.
   * FIXME: Should this be a range-price?
   *
   * @param productId the SKU or product to get the price for.
   */
  public abstract getPrice(productId: string): Promise<PriceType>;
}
