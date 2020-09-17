import { Injectable } from '@angular/core';
import { ISEOProvider } from 'perpendicular-core';
import { ISEORegistry } from 'perpendicular-core';
import { SEOToken } from 'perpendicular-core';

/**
 * A two-way lookup registry of SEO information from the backend.
 *
 * SEO tokens are grouped around types ('product','category','content','...').
 * Ideally this would match the routing model you chose for your application
 *
 * You can either look up the SEO value for an asset based on type and id, or resolve an incoming string to a SEO token to
 * determine if the url slug should be intepreted as a product navigation, category navigation or content display.
 *
 * @example
 * # looking up the seo slug for a product
 * ```
 *      seoRegistry.getURLKeyword('product', product.productId).then( seoToken => {
 *         this.seoSlug = seoToken.urlkeyword;
 *      })
 *  ```
 *
 * # looking up product id from seo slug
 * ```
 *      seoRegistry.getSEOToken(slugFromRouter).then( seoToken => {
 *         if (seoToken.type !== 'product') {
 *              // redirect him to somewhere else
 *         }
 *         this.product = productRegistry.get(seoToken.tokenValue);
 *      })
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class SEORegistry extends ISEORegistry {
  /**
   * Default constructor
   *
   * @param seoProvider backend communication module for seo information.
   */
  constructor(public seoProvider: ISEOProvider) {
    super();
  }

  /**
   * returns a SEOToken for the entity of type *type* with id *tokenValue*
   *
   * @param type the type modifier
   * @param tokenValue the id of the entity to look up seo information for.
   */
  public getURLKeyword(type: string, tokenValue: string): Promise<SEOToken> {
    return this.get(false, type, tokenValue);
  }

  /**
   * Returns a SEOToken for the url keyword. The URL keyword is usually a single URL segment, but
   * depending on your backend it may be the entire URL.
   *
   * @param urlkeyword i.e. ```live-lobster```
   */
  public getSEOToken(urlkeyword: string): Promise<SEOToken> {
    return this.get(true, urlkeyword);
  }

  /**
   * Adds the item to the internal cache. As a side effect, it stores the entry under both its urlkeyword and value+type as keys.
   */
  public addEntry(entry: SEOToken | Promise<SEOToken>, ...lookupParams: any[]): void {
    if (entry instanceof Promise) {
      entry.then(seoToken => {
        this.addSeoTokenEntry(seoToken, ...lookupParams);
      });
    } else {
      this.addSeoTokenEntry(entry, ...lookupParams);
    }
  }

  /**
   * fetches an item from the backend.
   */
  public fetchItem(byKeyword: boolean, arg1: string, arg2: string): Promise<SEOToken> {
    if (byKeyword) {
      return this.seoProvider.getSEOToken(arg1);
    } else {
      return this.seoProvider.getURLKeyword(arg1, arg2);
    }
  }

  /**
   * Helper function to deal with adding the item to the cache
   */
  private addSeoTokenEntry(entry: SEOToken, ...lookupParams: any[]): void {
    const prom: Promise<SEOToken> = Promise.resolve(entry);
    this.cachedEntries.set(this.getKey(true, entry.urlkeyword), prom);
    this.cachedEntries.set(this.getKey(false, entry.type, entry.tokenValue), prom);
  }
}
