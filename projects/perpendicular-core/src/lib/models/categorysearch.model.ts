import { Category } from './category.model';
/**
 *  Represents a multipage result from searching the category hierachy
 */
export class CategorySearchResult {
    /**
     * Constructor
     * @param totalCount total number of hits
     * @param pageNumber the page that this result represents
     * @param categories the resulting categories
     */
    constructor(public totalCount: number, public pageNumber: number, public categories: Array<Category>) {
        // intentionally empty
    }
}

/**
 * Class to represent the query. Currently this is empty. This class is used internally by the CategorySearchService, and should not
 * be used by the frontend components.
 */
export class CategorySearchQuery {}
