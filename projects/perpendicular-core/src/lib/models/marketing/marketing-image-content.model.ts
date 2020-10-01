import { MarketingContent } from './marketing-content.model';

/**
 * This respresents an image, as returned by the marketing engine.
 */
export class MarketingImageContent extends MarketingContent {
    /**
     * Alt text for the image, for use with Accessibility.
     */
    public altText = '';
    /**
     * The URL of the image
     */
    public url = '';
}
