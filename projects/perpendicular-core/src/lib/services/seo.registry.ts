import { SEOToken } from '../models/seotoken.model';
import { IRegistry } from './base.registry';

/**
 * Stateless UI service to translate between SEO url information and the internal identifers, and vice/versa.
 *
 * The SEO token can be anything, but is usually just the last part of the url.
 * I.e. if the url is /house/plants/ficcus, then the SEO token for the product would by 'ficcus', while 'house' and 'plants' would be
 * SEO Tokens for the two parent categories of the product.
 *
 * Not to be confused with the Canonical URL of a resource.
 */
export abstract class ISEORegistry<SEOTokenType extends SEOToken = SEOToken> extends IRegistry<SEOTokenType> {
  /**
   * Converts a type / value pair to a seo token, from which the url-slug can be extracted.
   * Example: type=Product, tokenValue=123145 returns a SEOToken with slug 'live-lobster'
   */
  public abstract getURLKeyword(type: string, tokenValue: string): Promise<SEOTokenType>;

  /**
   * resolves a urlkeyword to its seotoken value. For instance to convert live-lobster into a
   * product-id.
   */
  public abstract getSEOToken(urlkeyword: string): Promise<SEOTokenType>;
}
