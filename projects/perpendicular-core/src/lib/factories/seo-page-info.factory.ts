import { SEOPageInfo } from '../models/seo-page-info.model';

/**
 * An abstract factory to create instances of [[SEOPageInfo]]
 */
export abstract class ISEOPageInfoFactory {
  /**
   * Creates a new [[SEOPageInfo]]
   */
  public abstract newInstance(): SEOPageInfo;

  /**
   * Deserializes a new  [[SEOPageInfo]] from a backend response from [[ISEOPageInfoProvider]]
   */
  public abstract newInstanceFromJSON(json: any): SEOPageInfo;
}
