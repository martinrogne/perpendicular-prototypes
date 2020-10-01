import { Price } from '../models/price.model';

/**
 * An abstract factory to create instances of [[Price]]
 */
export abstract class IPriceFactory {
  /**
   * Creates a new [[Price]]
   */
  public abstract newInstance(): Price;

  /**
   * Deserializes a new  [[Price]] from a backend response from [[IPriceProvider]]
   */
  public abstract newInstanceFromJSON(json: any): Price;
}
