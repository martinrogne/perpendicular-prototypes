import { BaseSearchResult, BaseSearchQuery } from './../models/base.search.model';

/**
 * Default base class for a factory
 * @param T The type of entity that the result returns. I.e something from `model`
 */
export abstract class IFactory<T> {
    /**
     * Instantiates a new model.
     */
    public abstract newInstance(): T;

    /**
     * Instantiates a new model object, and deserializes the json coming from the backend
     */
    public abstract newInstanceFromJSON(json: any): T;
}

/**
 * Default base class for an entity that supports searching
 * @param T The type of entity that the result returns. I.e something from `model`
 * @param Q The type of query class that this is a result for. Must extend [[BaseSearchQuery]]
 * @param R the type of the result class that the search service is using. Must extend [[BaseSearchResult]]
 */
export abstract class ISearchFactory<T, Q extends BaseSearchQuery, R extends BaseSearchResult<T, Q> > extends IFactory<T> {
  public abstract newQueryInstance(q?: Q): Q;
  public abstract newResultInstance(totalCount: number, pageNumber: number, data: Array<T>, query: Q): R;
}
