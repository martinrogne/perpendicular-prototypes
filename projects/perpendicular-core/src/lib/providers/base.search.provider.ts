import { BaseSearchQuery, BaseSearchResult } from './../models/base.search.model';


/**
 * Base interface for simple search providers that can return paged data sets of a specific type.
 * @param T The type of entity that the result returns. I.e something from `model`
 * @param Q The type of query class that this is a result for. Must extend [[BaseSearchQuery]]
 * @param R the type of the result class that the search service is using. Must extend [[BaseSearchResult]]
 */
export abstract class ISearchProvider<T, Q extends BaseSearchQuery, R extends BaseSearchResult<T, Q>> {
  public abstract getByQuery(q: Q): Promise<R>;
}
