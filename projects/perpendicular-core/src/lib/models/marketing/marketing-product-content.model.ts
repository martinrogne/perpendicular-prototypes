import { MarketingContent } from './marketing-content.model';

/**
 * This respresents a product, as returned by the marketing engine. The marketing engine only
 * returns the product (by design) as an external identifier. This can then be used to query
 * the appropriate registry for the product data.
 */
export class MarketingProductContent extends MarketingContent {
    /**
     * The unique, internal identifier of the product.
     */
    public productId?: string;
}
