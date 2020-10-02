import { Injectable } from '@angular/core';
import { ISEORegistry, SEOToken, ISEOTokenFactory } from 'perpendicular-core';

/**
 * Mock version of [[ISEORegistry]].
 *
 * # Testdata
 * ## getSEOToken
 * | urlkeyword | will return |
 * |------------|-------------|
 * | product-xxx | a value |
 * | category-xxx | a value |
 *
 * ## getURLKeyword
 * | type | value | will return |
 * |------|-------|-------------|
 * | ProductToken | 10xx - 50xx | will return a value |
 * | CategoryToken | 10xx | will return a value |
 *
 */
@Injectable()
export class MockSEORegistry extends ISEORegistry {
  /**
   * See [[ISEORegistry]]
   */
  constructor(public factory: ISEOTokenFactory) {
    super();
    spyOn(this as ISEORegistry, 'getSEOToken').and.callThrough();
    spyOn(this as ISEORegistry, 'getURLKeyword').and.callThrough();
  }

  /**
   * See [[ISEORegistry]]
   */
  public getSEOToken(urlkeyword: string): Promise<SEOToken> {
    if (urlkeyword.startsWith('category-') || urlkeyword.startsWith('product-')) {
      const seoToken = this.factory.newInstance();
      seoToken.tokenValue = urlkeyword.replace('category-', '').replace('product-', '');
      if (urlkeyword.startsWith('category-')) {
        seoToken.type = 'CategoryToken';
      } else {
        seoToken.type = 'ProductToken';
      }
      seoToken.urlkeyword = urlkeyword;
      return Promise.resolve(seoToken);
    }
    return Promise.resolve(this.factory.newInstance());
  }

  /**
   * See [[ISEORegistry]]
   */
  public fetchItem(lookupParams: unknown): Promise<SEOToken> {
    return Promise.resolve({} as SEOToken);
  }

  /**
   * See [[ISEORegistry]]
   */
  public getURLKeyword(type: string, tokenValue: string): Promise<SEOToken> {
    if (type === 'CategoryToken') {
      if (Number(tokenValue) >= 1000 && Number(tokenValue) < 2000) {
        const seoToken = this.factory.newInstance();
        seoToken.tokenValue = tokenValue;
        seoToken.type = type;
        seoToken.urlkeyword = 'category-' + tokenValue;
        return Promise.resolve(seoToken);
      }
    }
    if (type === 'ProductToken') {
      if (Number(tokenValue) >= 1000 && Number(tokenValue) < 6000) {
        const seoToken = this.factory.newInstance();
        seoToken.tokenValue = tokenValue;
        seoToken.type = type;
        seoToken.urlkeyword = 'product-' + tokenValue;
        return Promise.resolve(seoToken);
      }
    }
    return Promise.resolve(this.factory.newInstance());
  }
}
