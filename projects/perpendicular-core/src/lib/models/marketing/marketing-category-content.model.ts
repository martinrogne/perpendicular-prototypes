import { MarketingContent } from './marketing-content.model';

/**
 * This respresents a category, as returned by the marketing engine. The marketing engine only
 * returns the category (by design) as an external identifier. This can then be used to query
 * the appropriate registry for the category data.
 */
export class MarketingCategoryContent extends MarketingContent {
    /**
     * The unique, internal identifier of the category.
     */
    public categoryId?: string;
}
