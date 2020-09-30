import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { IProductSearchProvider, IProductFactory, PRODUCTSEARCH_SEARCHTYPE, PERPENDICULAR_HTTP } from 'perpendicular-core';
import { Product, IIdentityService } from 'perpendicular-core';
import { ProductSearchQuery, ProductSearchResult } from 'perpendicular-core';
import { ProvidersWCSConfig } from 'perpendicular-core';
import { map } from 'rxjs/operators';
import { WCSProductFactory } from 'perpendicular-factories-wcs';

/**
 * This class provides mapping functions for the ProductView solr rest service
 * on Websphere Commerce
 *
 * @Inject WCSServerProductSearchBaseUrl - server and base url for the solr rest product
 * service
 *
 * Copyright 2015 - 2017 Theilgaard Mortensen a/s
 */
@Injectable({
  providedIn: 'root'
})
export class WCSProductSearchProvider extends IProductSearchProvider {
  /**
   * Should the search endpoint check entitlement or not
   */
  public checkEntitlement = false;

  /**
   * The contract to check against
   */
  public contractId: string | null | undefined;

  /**
   * The search type defines what kind of product records are returned and how the search term is matched against
   * the indexed data.
   * You can specificy this as an injected configuration option 'ProductSearch.SearchType'. The default is 1000, which is suitable for
   * a "type, and press enter to search" style search. For progressive search result display, you might want to consider 1002, and ensure
   * the searchTerm is suffixed with an asterix to indicate a prefix search.
   *
   * 		The following search types are supported:
   *
   * |	Match type              |   Search Type		|         Description                                                         |
   * -----------------------------------------------------------------------------------------------------------------------------
   * | 1.  ANY 					|		0			|  INCLUDE products, kits, bundles                                            |
   * |							|					|  EXCLUDE product level SKUs and category level SKUs                         |
   * |							|					|                                                                             |
   * | 2.  EXACT					|		1			|  INCLUDE products, kits, bundles                                            |
   * |							|					|  EXCLUDE product level SKUs and category level SKUs                         |
   * |							|					|                                                                             |
   * | 3.  ALL					|		2			|  INCLUDE products, kits, bundles                                            |
   * |							|					|  EXCLUDE product level SKUs and category level SKUs                         |
   * |							|					|                                                                             |
   * | 4.  NONE					|		3			|  INCLUDE products, kits, bundles                                            |
   * |							|					|  EXCLUDE product level SKUs and category level SKUs						  |
   * |							|					|                                                                             |
   * | 5.  ANY					|		10			|  INCLUDE products, kits, bundles, product level SKUs, category level SKUs   |
   * |							|					|  EXCLUDE                                                                    |
   * |							|					|                                                                             |
   * | 6.  EXACT					|		11			|  INCLUDE products, kits, bundles, product level SKUs, category level SKUs   |
   * |							|					|  EXCLUDE                                                                    |
   * |							|					|                                                                             |
   * | 7.  ALL					|		12			|  INCLUDE products, kits, bundles, product level SKUs, category level SKUs   |
   * |							|					|  EXCLUDE                                                                    |
   * |							|					|                                                                             |
   * | 8.  NONE					|		13			|  INCLUDE products, kits, bundles, product level SKUs, category level SKUs   |
   * |							|					|  EXCLUDE                                                                    |
   * |							|					|                                                                             |
   * | 9.  ANY					|		100			|  INCLUDE product level SKUs, category level SKUs                            |
   * |							|					|  EXCLUDE products, kits, bundles	                                          |
   * |							|					|                                                                             |
   * | 10.  EXACT				|		101			|  INCLUDE product level SKUs, category level SKUs                            |
   * |							|					|  EXCLUDE products, kits, bundles                                            |
   * |							|					|                                                                             |
   * | 11.  ALL					|		102			|  INCLUDE product level SKUs, category level SKUs                            |
   * |							|					|  EXCLUDE products, kits, bundles                                            |
   * |							|					|                                                                             |
   * | 12.  NONE					|		103			|  INCLUDE product level SKUs, category level SKUs                            |
   * |							|					|  EXCLUDE products, kits, bundles                                            |
   * |							|					|                                                                             |
   * | 13.  ANY					|		1000		|  INCLUDE products, kits, bundles, category level SKUs                       |
   * |							|	  (Default)		|  EXCLUDE product level SKUs                                                 |
   * |							|					|                                                                             |
   * | 14.  EXACT				|		1001		|  INCLUDE products, kits, bundles, category level SKUs                       |
   * |							|					|  EXCLUDE product level SKUs                                                 |
   * |							|					|                                                                             |
   * | 15.  ALL					|		1002		|  INCLUDE products, kits, bundles, category level SKUs                       |
   * |							|					|  EXCLUDE product level SKUs                                                 |
   * |							|					|                                                                             |
   * | 16.  NONE					|		1003		|  INCLUDE products, kits, bundles, category level SKUs                       |
   * |							|					|  EXCLUDE product level SKUs								                  |
   * |							|					|                                                                             |
   * | 17.  ANY					|		10000		|  INCLUDE category level SKUs                                                |
   * |							|					|  EXCLUDE products, kits, bundles, product level SKUs                        |
   * |							|					|						                                                      |
   * | 17.  EXACT				|		10001		|  INCLUDE category level SKUs                                                |
   * |							|					|  EXCLUDE products, kits, bundles, product level SKUs						  |
   * |							|					|						                                                      |
   * | 18.  ALL					|		10002		|  INCLUDE category level SKUs                                                |
   * |							|					|  EXCLUDE products, kits, bundles, product level SKUs	                      |
   * |							|					|						                                                      |
   * | 19.  NONE					|		10003		|  INCLUDE category level SKUs                                                |
   * |							|					|  EXCLUDE products, kits, bundles, product level SKUs	                      |
   *
   *
   */
  public searchType: string;

  /**
   * Base path for the resource
   */
  public basepath: string;

  /**
   * Constructor
   */
  constructor(
    @Inject(PERPENDICULAR_HTTP) public http: HttpClient,
    @Inject(IProductFactory) public productFactory: WCSProductFactory,
    public config: ProvidersWCSConfig,
    public identityService: IIdentityService,
    @Optional()
    @Inject(PRODUCTSEARCH_SEARCHTYPE)
    public configSearchType: string,
  ) {
    super();
    this.basepath = config.getSolrEndpointUrl('productview');
    this.searchType = configSearchType || '1000';

    this.checkEntitlement = config.checkEntitlement;
    if (this.checkEntitlement) {
      this.identityService.state.subscribe(x => {
        this.contractId = x.activeContractId;
      });
    }
  }

  /**
   * Fetch by query
   */
  public getByQuery(query: ProductSearchQuery): Promise<ProductSearchResult> {
    this.validateQuery(query);
    const actualSearchTerm: string = this.getActualSearchTerm(query);

    let url: string;
    let qp: HttpParams;

    if (this.isCategoryViewRequest(query, actualSearchTerm)) {
      url = this.getProductsInCategoryUrl(query.categoryId || '');
      qp = this.getSearchParamsForCategory(query);
    } else {
      url = this.getSearchUrl(query, actualSearchTerm);
      qp = this.getSearchParams(query, actualSearchTerm);
    }

    return this.http.get(url, { params: qp }).pipe(
      map(x => this.productFactory.newSearchResultInstanceFromJSON(x, query))
    ).toPromise();
  }

  /**
   * Fetches one or more product/sku from the backend
   */
  public getProductById(pId: string | string[]): Promise<Array<Product>> {
    let productIds: Array<string> = [];
    if (pId instanceof Array) {
      productIds = pId;
    } else {
      productIds = [pId];
    }

    const url: string = this.getProductByIdUrl(productIds);
    const usp: HttpParams = this.getProductByIdParams(productIds);

    return this.http.get(url, { params: usp }).pipe(
      map(x => this.productFactory.newInstancesFromJSON(x))
    ).toPromise();
  }

  /**
   * Fetches exactly one product/sku from the backend, by its partnumber.
   */
  public getProductByPartnumber(partnumber: string): Promise<Product> {
    const url: string = this.getProductByPartnumberUrl(partnumber);
    const usp: HttpParams = this.getProductByPartnumberParams(partnumber);

    return this.http.get(url, { params: usp }).pipe(
      map(x => this.productFactory.newInstanceFromJSON(x))
    ).toPromise();
  }

  /**
   * The search term we *use* may be different from the one that was entered. Primarily to deal with
   * things such as empty terms. Specifically, we do not want nulls or undefined.
   */
  protected getActualSearchTerm(p: ProductSearchQuery): string {
    let tmpSearchTerm = p.searchTerm;
    if (tmpSearchTerm === null || tmpSearchTerm === undefined) {
      tmpSearchTerm = '';
    }
    return tmpSearchTerm;
  }

  /**
   * Converts a ProductSearchQuery into the proper REST Get url for
   * Websphere Commerce.
   */
  protected getSearchUrl(p: ProductSearchQuery, actualSearchTerm: string): string {
    const service = this.basepath + '/bySearchTerm/' + actualSearchTerm;
    return service;
  }

  /**
   * Websphere Commerce caches /byCategory/ but not /bySearchTerm/ so we prefer to use this if possible
   */
  protected getProductsInCategoryUrl(categoryId: string): string {
    const service = this.basepath + '/byCategory/' + categoryId;
    return service;
  }

  /**
   * Helper method to get product details query parameters
   */
  protected getProductByIdParams(productIds: string[]): HttpParams {
    let usp: HttpParams = new HttpParams();
    for (const productId of productIds) {
      usp = usp.append('id', '' + productId);
    }
    usp = this.addEntitlementParams(usp);
    usp = this.addPriceModeParams(usp);
    return usp;
  }

  protected getProductByPartnumberParams(partNumber: string): HttpParams {
    let usp: HttpParams = new HttpParams();
    usp = this.addEntitlementParams(usp);
    usp = this.addPriceModeParams(usp);
    return usp;
  }

  protected addPriceModeParams(usp: HttpParams): HttpParams {
    if (this.config.priceMode) {
      usp = usp.append('priceMode', this.config.priceMode);
    }
    return usp;
  }

  protected addEntitlementParams(usp: HttpParams): HttpParams {
    if (this.checkEntitlement) {
      usp = usp.append('checkEntitlement', 'true');
      if (this.contractId) {
        usp = usp.append('contractId', this.contractId);
      }
    }
    return usp;
  }

  /**
   * Helper function to calculate URL parameters
   */
  protected getBaseSearchParamsForCategory(p: ProductSearchQuery): HttpParams {
    let usp: HttpParams = new HttpParams();
    usp = usp.append('searchSource', 'E');
    usp = usp.append('searchType', this.searchType);
    usp = usp.append('pageSize', String(p.pageSize));
    usp = usp.append('pageNumber', String(p.pageNumber));

    for (const key in p.facets) {
      if (p.facets.hasOwnProperty(key)) {
        const f = p.facets[key];
        usp = usp.append('facet', f);
      }
    }

    p.filters.forEach((value, key) => {
      usp = usp.append('filterquery', key + ':(' + value + ')');
    });

    // default sort method is 'relevancy'
    if (p.sortMethod > 0) {
      usp = usp.append('orderBy', String(p.sortMethod));
    }

    usp = this.addEntitlementParams(usp);
    usp = this.addPriceModeParams(usp);

    return usp;
  }

  /**
   * Helper function to calculate URL parameters
   */
  protected getSearchParams(p: ProductSearchQuery, actualSearchTerm: string): HttpParams {
    let usp = this.getBaseSearchParamsForCategory(p);
    usp = usp.append('intentSearchTerm', p.searchTerm || '');
    if (p.categoryId) {
      usp = usp.append('categoryId', String(p.categoryId));
    }
    return usp;
  }

  /**
   * Helper function to calculate URL parameters
   */
  protected getSearchParamsForCategory(p: ProductSearchQuery): HttpParams {
    const usp = this.getBaseSearchParamsForCategory(p);
    return usp;
  }

  /**
   * Returns resource-url for specific product
   */
  protected getProductByIdUrl(pId: string[]): string {
    if (pId == null) {
      throw new Error('ProductId missing');
    }
    return this.basepath + '/byIds';
  }

  /**
   * Returns resource-url for specific product
   */
  protected getProductByPartnumberUrl(partnumber: string): string {
    return this.basepath + '/' + partnumber;
  }

  protected validateQuery(p: ProductSearchQuery): void {
    if (!p.pageSize || p.pageSize < 1 || p.pageSize > 99) {
      throw new Error('Invalid page size in query: ' + p.pageSize);
    }
    if (!p.searchTerm && !p.categoryId) {
      throw new Error('Either search term or category must be specified');
    }
    if (!p.pageNumber || p.pageNumber < 1) {
      throw new Error('Invalid page number in query: ' + p.pageNumber);
    }
  }

  /**
   * We use the cached category based endpoint, IFF there is no search term AND we have a valid category id
   */
  protected isCategoryViewRequest(p: ProductSearchQuery, actualSearchTerm: string): boolean {
    if (p.categoryId && (actualSearchTerm === '*' || actualSearchTerm === '')) {
      return true;
    }

    return false;
  }
}
