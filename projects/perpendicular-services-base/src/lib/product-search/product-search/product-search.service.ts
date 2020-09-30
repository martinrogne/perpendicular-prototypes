import { Injectable } from '@angular/core';
import {
  IIdentityService,
  IProductFactory,
  IProductSearchProvider,
  IProductSearchService,
  ProductSearchSortMethod
} from 'perpendicular-core';


@Injectable()
export class ProductSearchService extends IProductSearchService {
  /**
   * Default Constructor.
   *
   * @param searchProvider a backend driver that can perform the actual search requests.
   * @param configDefaultPageSize optional configuration setting, injected via injection token PRODUCTSEARCH_DEFAULT_PAGESIZE
   */
  constructor(public identityService: IIdentityService, public provider: IProductSearchProvider, public factory: IProductFactory) {
    super(provider, factory, identityService);
    this.resetQuery();
  }

  /**
   * Gets the current method to use for sorting the result set. See [[ProductSearchSortMethod]]
   */
  public get sortMethod(): ProductSearchSortMethod {
    return this.query.sortMethod;
  }

  /**
   * Sets the sort method to use for the result set. See [[ProductSearchSortMethod]]
   */
  public set sortMethod(value: ProductSearchSortMethod) {
    this.query.sortMethod = value;
    this.query.pageNumber = 1;
    this.executeQuery();
  }

  /**
   * Sets the search term(s).
   * Executes against the server.
   * @param searchTerm the term to search for. You should not include wildcard characters in this string,
   *                   the provider layer is responsible for defining the search behavior. Pass only what the
   *                   user actually typed.
   */
  public setSearchTerm(searchTerm: string): void {
    this.query.searchTerm = searchTerm;
    if (this.query.searchTerm) {
      this.query.searchTerm = this.query.searchTerm.trim();
    }
    this.executeQuery();
  }

  /**
   * Returns the currently applied search term
   */
  public getSearchTerm(): string {
    return this.query.searchTerm || '';
  }

  /**
   * Resets search criteria, based around a search term
   */
  public newSearchForSearchTerm(s: string): void {
    this.resetQuery();
    this.setSearchTerm(s);
  }

  /**
   * Resets search criteria, based around a specific category
   */
  public newSearchForCategory(categoryId: string): void {
    this.resetQuery();
    this.setCategoryId(categoryId);
  }

  /**
   * Adds or removes a facet value from the current search. If it is already there, it will be removed, otherwise it is added.
   * *Note* This will add a facet selection to the query, regardless of the facet configuration metadata regarding multiselectivity
   * or not. How facets interact with the user should be handled in the frontend.
   *
   * After adding a facet, the current page number is reset to page 1.
   * Reexecutes the search against the backend.
   * @param facetValueToken the value part of a FacetValue returned from a previous search.
   *        The token should be self-contained, and no meaning should be gleaned from its contents.
   *
   */
  public toggleFacet(facetValueToken: string): void {
    const idx = this.query.facets.indexOf(facetValueToken);
    // if already present, then remove
    if (idx > -1) {
      this.query.facets.splice(idx, 1);
    } else {
      // otherwise add
      // always reset page number, as presumably the resulting set will be smaller
      this.query.pageNumber = 1;
      this.query.facets.push(facetValueToken);
    }
    this.executeQuery();
  }

  /**
   * Adds a generic filter to the query.
   * You will have to know the fieldname in advance, to make use of this.
   *
   * There can only be one filter pr field, but the filter can use and/or logic to search for various
   * combinations.
   *
   * If you add a second filter with the same fieldName it will overwrite the first filter.
   *
   * Since WCS is using SOLR in the backend, you can use the syntax for boolean operations described here
   * https://wiki.apache.org/solr/CommonQueryParameters#fq
   * @param fieldName the name to filter by.
   * @param filter the filter to apply.
   */
  public addFilter(fieldName: string, filter: string): void {
    if (this.query.filters.has(fieldName)) {
      this.query.filters.delete(fieldName);
    }
    if (filter) {
      this.query.filters.set(fieldName, filter);
    }
    this.query.pageNumber = 1;
    this.executeQuery();
  }

  /**
   * Removes a filter from the query, and re-executes it.
   * If the field was not filtered, this will not do anything.
   */
  public removeFilter(fieldName: string): void {
    if (this.query.filters.has(fieldName)) {
      this.query.filters.delete(fieldName);
      this.query.pageNumber = 1;
      this.executeQuery();
    }
  }

  /**
   * Returns whatever filter is applied to the fieldname. Returns the empty string '',
   * if no filter is applied.
   */
  public getFilter(fieldName: string): string {
    if (this.query.filters.has(fieldName)) {
      return this.query.filters.get(fieldName) || '';
    }
    return '';
  }

  /**
   * Sets the category id to filter search results by. Reexecutes the search. This is used for category navigation to limit the
   * results shown, to those that reside under this category.
   * Reexecutes the search, but does not reset other search parameters.
   * @param categoryId the category unique identifier
   */
  public setCategoryId(categoryId: string): void {
    this.query.categoryId = categoryId;
    this.query.pageNumber = 1;
    this.executeQuery();
  }

  /**
   * returns the categoryid currently set in the query.
   */
  public getCategoryId(): string {
    return this.query.categoryId || '';
  }

  /**
   * Utility function for other components to verify if a specific
   * facet is part of the current query.
   */
  public queryHasFacet(s: string): boolean {
    return this.query.facets.indexOf(s) > -1;
  }

  /**
   * Utility function to clear up all parameters in a query. Does not reexecute search
   */
  protected resetQuery(): void {
    this.query.pageNumber = 1;
    this.query.facets = [];
    this.query.filters.clear();
    this.query.categoryId = '';
    this.query.searchTerm = '';
    this.query.sortMethod = ProductSearchSortMethod.RELEVANCY;
  }

  /**
   *   Executes the search, and notifies the world of the result.
   */
  protected executeQuery(): void {
    // no empty searches please... All searches should be based on either a category or a searchterm.
    if (this.query.categoryId || this.query.searchTerm) {
      super.executeQuery();
    } else {
      this.internalState.next(this.factory.newResultInstance(0, 1, [], this.factory.newQueryInstance(this.query)));
    }
  }
}
