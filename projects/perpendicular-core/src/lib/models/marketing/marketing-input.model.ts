import { BaseModel } from '../base.model';

/**
 * This represents the full set of input options, as typically presented to the marketing engine.
 * These should, for the most part, be encapsulated and injected by an underlying layer. These
 * are what allow the marketing engine to react based on whether the customer views a given product,
 * category, search term or similar.
 */
export class MarketingInput extends BaseModel {
    /**
     * The current product ID, in context of which the spot will be displayed.
     */
    public productId?: string;

    /**
     * The current category ID, in context of which the spot will be displayed.
     */
    public categoryId?: string;

    /**
     * The current searchterm, in context of which the spot will be displayed.
     */
    public searchTerm?: string;

    /**
     * The maximum amount of content to be returned for this spot. Note that the actual
     * amount of content returned may be lower, once post-filtering is applied to remove
     * invalid elements.
     */
    public maxContentToDisplay?: number;

    /**
     * The maximum amount of products to return for this spot.
     */
    public maxProductsToDisplay?: number;

    /**
     * The maximum amount of categories to return for this product.
     */
    public maxCategoriesToDisplay?: number;

    /**
     * The current parameters of the URL. These are forwarded and made available to the business
     * user for customization in the administration tools.
     */
    public urlParameters: Map<string, string> = new Map<string, string>();

    /**
     * The URL which referred the customer to the current page, typically used in the case
     * of external referral to the site.
     */
    public referralUrl?: string;
}
