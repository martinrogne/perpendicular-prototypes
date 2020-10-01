import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { ISEOProvider, ISEOTokenFactory, PERPENDICULAR_HTTP, ProvidersWCSConfig } from 'perpendicular-core';
import { SEOToken } from 'perpendicular-core';
import { WCSSEOTokenFactory } from 'perpendicular-factories-wcs';
import { map } from 'rxjs/operators';

/**
 * WebSphere Commerce specific implementation of [[ISEOProvider]]
 */
@Injectable()
export class WCSSEOProvider extends ISEOProvider {
  /**
   * Base path for the resource
   */
  protected basepath: string;

  /**
   * Default Constructor
   */
  constructor(@Inject(PERPENDICULAR_HTTP) protected http: HttpClient,
              protected factory: ISEOTokenFactory,
              protected config: ProvidersWCSConfig) {
    super();
    this.basepath = config.getWcsEndpointUrl('seo');
  }

  /**
   * Fetches the seo slug to use, for a specific seo token and type.
   */
  public getURLKeyword(type: string, tokenValue: string): Promise<SEOToken> {
    const params: HttpParams = this.getURLKeywordArguments(type, tokenValue);

    if (this.config.useExtendedSEOTokenLookupLogic) {
      const promiseArray = [];
      const storeOrder = this.getSEOStoreSearchOrder();
      promiseArray.push(
        ...storeOrder.map(aStoreId => {
          const url = this.getSEOUrlKeywordUrl(aStoreId);

          return this.http.get(url, { params }).pipe(
            map(x => (this.convertToSEOToken(tokenValue, type))(x))
          ).toPromise();
        }),
      );

      return Promise.all(promiseArray).then(results => {
        const finalResults = results.filter(x => !!x && x.id);
        if (finalResults.length > 0) {
          return finalResults[0];
        } else {
          return Promise.resolve(this.factory.newInstance());
        }
      });
    } else {
      const url: string = this.getSEOUrlKeywordUrl();

      return this.http.get(url, { params }).pipe(
        map(x => (this.convertToSEOToken(tokenValue, type))(x))
      ).toPromise();
    }
  }

  /**
   * Fetches the token and type based on seo slug
   */
  public getSEOToken(urlkeyword: string): Promise<SEOToken> {
    const params: HttpParams = this.getSEOTokenArguments(urlkeyword);

    // so...for products and categories, we have to query the extended sites cas, but for other pages, we query the
    // instance store first, then the asset store if it exists...
    // we assume the BASE url is pointing to the instance store, so we make a series of calls, and see which one returns a value...
    // only, since all sites already in production thinks this is fixed on the server, we have to be compatible
    if (this.config.useExtendedSEOTokenLookupLogic) {
      const promiseArray = [];
      const storeOrder = this.getSEOStoreSearchOrder();
      promiseArray.push(
        ...storeOrder.map(aStoreId => {
          const url = this.getSEOTokenUrl(aStoreId);

          return this.http.get(url, { params }).pipe(
            map(x => this.convertToSEOToken()(x))
          ).toPromise();
        }),
      );

      return Promise.all(promiseArray).then(results => {
        const finalResults = results.filter(x => !!x && x.id);

        if (finalResults.length > 0) {
          return finalResults[0];
        } else {
          return Promise.resolve(this.factory.newInstance());
        }
      });
    } else {
      console.log('use regular logic');

      const url: string = this.getSEOTokenUrl();

      return this.http.get(url, { params }).pipe(
        map(x => this.convertToSEOToken()(x))
      ).toPromise();
    }
  }

  /**
   * Returns the order that the stores should be queried.
   *
   * Note: The default implementation uses instanceStore, sasStore, casStore which matches
   * what the backend SHOULD have done.
   *
   * It is, however, not optimal, if most of your queries are going to be for products, so you may
   * consider either overwriting this to return casStore, instanceStore, sasStore
   *
   * This works, because the default wcs implementation of seo tokens is kinda broken, so
   * its not exactly clear that it would work, if the instance store or storefront asset store
   * actually DID provide overrides for product tokens, vis-a-vis what would get indexed in solr.
   *
   * Once the site is running though, all product lookups will most likely be from a warm cache, so it should
   * only be static content pages that even get this far.
   *
   */
  protected getSEOStoreSearchOrder(): number[] {
    const order = [];
    order.push(this.config.storeId as number);
    if (this.config.sasStoreId) {
      order.push(this.config.sasStoreId as number);
    }
    order.push(this.config.casStoreId as number);
    return order;
  }

  /**
   * Helper function to calculate the URL to use
   */
  protected getSEOUrlKeywordUrl(storeId?: number): string {
    if (!!storeId) {
      const storeBasePath = this.config.getEndpointUrlForStore(this.config.wcsServerHost, this.config.wcsServerBaseRestUrl, 'seo', storeId);
      return storeBasePath + '/urlkeyword';
    } else {
      return this.basepath + '/urlkeyword';
    }
  }

  /**
   * Helper function to calculate URL parameters to use
   */
  protected getURLKeywordArguments(type: string, tokenValue: string): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('q', 'byLanguageIdAndTokenNameValue');
    params = params.append('languageId', '' + this.config.languageId);
    params = params.append('tokenName', type);
    params = params.append('tokenValue', tokenValue);
    return params;
  }

  /**
   * Helper function to calculate the URL to use
   */
  protected getSEOTokenUrl(storeId?: number): string {
    if (!!storeId) {
      const storeBasePath = this.config.getEndpointUrlForStore(this.config.wcsServerHost, this.config.wcsServerBaseRestUrl, 'seo', storeId);
      return storeBasePath + '/token';
    } else {
      return this.basepath + '/token';
    }
  }

  /**
   * Helper function to calculate URL parameters to use
   */
  protected getSEOTokenArguments(urlkeyword: string): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.append('q', 'byUrlKeywordNames');
    params = params.append('urlKeywordName', urlkeyword);
    return params;
  }

  /**
   * Helper function to deserialize the result.
   */
  protected convertToSEOToken(queryTokenValue?: string, queryTokenType?: string): (res: any) => SEOToken {
    return res => {
      if (!res || !res.resultList || res.resultList.length === 0) {
        return this.factory.newInstance();
      }

      const seoTokenJSON = res.resultList[0];
      const seotoken: SEOToken = (this.factory as WCSSEOTokenFactory).newInstanceFromJSON(seoTokenJSON, queryTokenType, queryTokenValue);

      if (!seotoken.urlkeyword) {
        return this.factory.newInstance();
      }
      return seotoken;
    };
  }
}
