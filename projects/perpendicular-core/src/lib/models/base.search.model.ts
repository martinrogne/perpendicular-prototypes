/**
 * Base class for queries.
 * This is used to drive search services that support paging and possibly later sorting.
 * You would extend on this class for your specific entity. It should not be used directly.
 */
export abstract class BaseSearchQuery {
  /**
   * How many to fetch, defaults to 10
   * The constructor takes an optional default page size parameter populated by the factory / injectables
   */
  public pageSize: number;

  /**
   * Page to fetch, defaults to 1;
   */
  public pageNumber: number;

  constructor(q?: BaseSearchQuery, defaultPageSize?: number) {
    if (!!q) {
      this.pageNumber = q.pageNumber;
      this.pageSize = q.pageSize;
    } else {
      this.pageNumber = 1;
      this.pageSize = defaultPageSize ? defaultPageSize : 10;
    }
  }
}

/**
 * Default base class for paged search results.
 * It represents a single page in a paged search result. You are given the query back that
 * the page is a result of, in case you need it.
 *
 * Your search result class should inherit on this.
 *
 * @param T The type of entity that the result returns. I.e something from `model`
 * @param Q The type of query class that this is a result for. Must extend [[BaseSearchQuery]]
 */
export abstract class BaseSearchResult<T, Q extends BaseSearchQuery> {
  /**
   * Returns how many pages are in the total result set.
   */
  public totalPages: number;

  /**
   *
   * @param totalCount Number of records in the result set
   * @param pageNumber The page of the result set that this object represents
   * @param result list of objects
   * @param query the original query.
   */
  constructor(public totalCount: number, public pageNumber: number, public result: T[], public query: Q) {
    this.totalPages = Math.ceil(this.totalCount / (query.pageSize * 1.0));
  }
}
