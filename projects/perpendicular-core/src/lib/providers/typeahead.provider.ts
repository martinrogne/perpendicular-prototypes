import { TypeAheadQuery, TypeAheadResultSet, TypeAheadType } from '../models/typeahead.model';

/**
 * This provider is responsible for fetching type-ahead suggestions for page search.
 * NOTE: This provider is registered as a multi dependency, so if you have any custom
 * type ahead providers, you can register that as well, and both will be invoked.
 *
 */
export abstract class ITypeAheadProvider {
    /**
     * Fetches a set of type-ahead suggestions from the backend.
     */
    public abstract getResult(p: TypeAheadQuery): Promise<TypeAheadResultSet>;

    /**
     * Queries the provider to return the list of TypeAheadTypes it supports
     */
    public abstract getSupportedTypes(): TypeAheadType[];
}
