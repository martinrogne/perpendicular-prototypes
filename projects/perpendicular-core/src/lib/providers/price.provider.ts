import { Price } from '../models/price.model';

/**
 * A provider to fetch offer price information from the backend.
 *
 * Offer prices differ from List Prices, in that the offer price is what the customer pays, while the
 * List Price is what a product used to cost.
 */
export abstract class IPriceProvider {
  /**
   * Fetches an OFFER price for a specific product.
   *
   * FIXME: Should we support range pricing immediatly?
   * @param productId either a product or SKU identifier.
   */
  public abstract getPriceByProductId(productId: Array<string>): Promise<Array<Price>>;

  /**
   * Fetches an OFFER price for a specific product.
   *
   * FIXME: Should we support range pricing immediatly?
   * @param productId either a product or SKU identifier.
   */
  public abstract getListPriceByProductId(productId: Array<string>): Promise<Array<Price>>;
}
