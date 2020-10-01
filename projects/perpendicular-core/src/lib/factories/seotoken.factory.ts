import { SEOToken } from '../models/seotoken.model';

/**
 * An abstract factory to create instances of [[SEOToken]]
 */
export abstract class ISEOTokenFactory {
  /**
   * Creates a new [[SEOToken]]
   */
  public abstract newInstance(): SEOToken;

  /**
   * Deserializes a new  [[SEOToken]] from a backend response from [[ISEOTokenProvider]]
   */
  public abstract newInstanceFromJSON(json: any): SEOToken;
}
