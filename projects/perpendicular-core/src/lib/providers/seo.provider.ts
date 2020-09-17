import { SEOToken } from '../models/seotoken.model';

/**
 * A provider to resolve SEO urls.
 *
 */
export abstract class ISEOProvider {
  /**
   * Based on a type, and a tokenvalue, this function will return the seo-slug to present to the customer.
   *
   * @param type one of "Product","Category","Content"
   * @param tokenValue one of productId, categoryId or pageId.
   */
  public abstract getURLKeyword(type: string, tokenValue: string): Promise<SEOToken>;

  /**
   * resolves a seo-slug into information about which data object to show.
   *
   * @return a [[SEOToken]] with type and tokenValue filled in.
   *
   * @example
   *
   * ## looking up a product based on a seo url passed in the router
   * ```
   *    seoProvider.getSEOToken(routerParam.get('productname')).then( x=> {
   *       this.product = productRegistry.getProduct(x.tokenValue);
   *    });
   * ```
   */
  public abstract getSEOToken(urlkeyword: string): Promise<SEOToken>;
}
