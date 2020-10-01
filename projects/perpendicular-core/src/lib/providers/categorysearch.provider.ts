import { CategorySearchResult } from '../models/categorysearch.model';
import { Category } from '../models/category.model';

/**
 * Category Registry. Can be used to fetch information about the category structure as a whole, and a single category in specifics.
 */
export abstract class ICategorySearchProvider {
    /**
     * Fetch all categories
     *
     * FIXME: We should have a navigationService that serves the list as an observable, as the
     * menu can change depending on the users contract.
     */
    public abstract getTopCategories(): Promise<CategorySearchResult>;

    /**
     * Fetches information about a single category.
     *
     * @param categoryId the category to look for.
     */
    public abstract getCategoryById(categoryId: string): Promise<Category>;


    /**
     * Fetches information about a single category.
     *
     * @param identifier the external identifier of the category to look for.
     */
    public abstract getCategoryByExternalIdentifier(identifier: string): Promise<Category>;
}
