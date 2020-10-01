import { BaseModel } from '../base.model';
import { MarketingAction } from './marketing-action.model';
import { MarketingExperiment } from './marketing-experiment.model';

/**
 * This represents a common base class for all types of marketing content, as the content
 * returned from WCS may take on different shapes. It can be products, categories, images,
 * assets (files), complex content and similar.
 *
 * It can be re-cast to the appropriate subclass by checking instanceof on the object
 */
export abstract class MarketingContent extends BaseModel {
    /**
     * The piece of text (in plain text or HTML) that is associated with the content.
     */
    public text = '';

    /**
     * The action represented by interacting with this piece of content, typically in the format
     * of what should happen when the customer clicks on the product (navigate to product, add
     * product to cart, add product to wishlist).
     */
    public action?: MarketingAction;

    /**
     * The experiment data associated with the espot, if one has been set. This is used for
     * A/B testing different options.
     */
    public experiment?: MarketingExperiment;

    /**
     * The activity ID associated with this particular piece of content, in this particular activity.
     */
    public contentActivityId?: string;

    /**
     * The primary identifier of the content (productId, categoryId, contentId).
     */
    public contentId?: string;
}
