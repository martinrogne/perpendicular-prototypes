import { BaseSearchQuery, BaseSearchResult } from './base.search.model';
import { Facet } from './facet.model';
import { Product } from './product.model';

/**
 * The default sorting options.
 * If you need to add custom sorting options do so by re-defining the enum like so
 *
 * ```
 *   export enum ProductSearchSortMethod {
 *       CUSTOM = 10,
 *       MY_OWN_METHOD = 11,
 *   }
 * ```
 * This will in effect append those values to the default ones defined here. Values under 10 are reserved for "@perpendicular/core"
 */
export enum ProductSearchSortMethod {
  RELEVANCY = 0,
  MANUFACTURER = 1,
  PRODUCTNAME = 2,
  PRICE_ASC = 3,
  PRICE_DESC = 4,
}

/**
 * This class represents a page of a product search result
 *
 * @param totalCount the number of hits in the entire result set
 * @param pageNumber the page within the search set that is returned in this object
 * @param products the products of the search
 * @param facet the facets relevant to the search
 * @param categoryFacet the special facet that holds all categories with hits
 * @param spellCheck a string array of alternate words that could have been meant. Usually only populated if the result is empty
 * @param sortMethod the sorting that is applied to the overall result to get this page.
 * @param query the product search query.
 */
export class ProductSearchResult<
  ProductType extends Product = Product,
  ProductSearchQueryType extends ProductSearchQuery = ProductSearchQuery
> extends BaseSearchResult<ProductType, ProductSearchQueryType> {
  constructor(
    public totalCount: number,
    public pageNumber: number,
    public products: Array<ProductType>,
    public facets: Array<Facet>,
    public categoryFacet: Facet,
    public spellCheck: Array<string>,
    public sortMethod: ProductSearchSortMethod,
    public query: ProductSearchQueryType,
  ) {
    super(totalCount, pageNumber, products, query);
  }
}

/**
 * Used to setup a multi page query with the backend. This class is used internally in the [[ProductSearchService]], and should
 * not be used by frontend components.
 */
export class ProductSearchQuery extends BaseSearchQuery {
  /**
   * The search term to search for
   */
  public searchTerm?: string;

  /**
   * The sorting method to apply when fetching the results.
   */
  public sortMethod = ProductSearchSortMethod.RELEVANCY;

  /**
   * The facet values to filter the query by.
   */
  public facets: Array<string> = [];

  /**
   * The filters, if any, that is applied to the query.
   */
  public filters: Map<string, string>;

  /**
   * The category id to limit the search in. Can be used to implement category navigation, by setting this
   * to something and avoiding setting the searchTerm property
   */
  public categoryId?: string;

  /**
   * Default constructor.
   */
  constructor(q?: ProductSearchQuery) {
    super(q);
    if (!!q) {
      this.searchTerm = q.searchTerm;
      this.sortMethod = q.sortMethod;
      this.facets = [...q.facets];
      this.filters = new Map(q.filters);
      this.categoryId = q.categoryId;
    } else {
      this.filters = new Map<string, string>();
    }
  }
}
