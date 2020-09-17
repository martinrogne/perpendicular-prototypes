import { NewsletterProfile, NewsletterCategory } from '../models/newsletterprofile.model';

/**
 * Factory to deserialize newsletter profile entries
 */
export abstract class INewsletterProfileFactory {
    /**
     * Instantiates a new [[NewsletterProfile]]
     */
    public abstract newInstance(): NewsletterProfile;

    /**
     * Instantiates a new [[NewsletterProfile]] from a backend JSON
     */
    public abstract newInstanceFromJSON(json: any): NewsletterProfile;

    /**
     * Instantiates a new [[NewsletterCategory]]
     */
    public abstract newNewsletterCategoryInstance(): NewsletterCategory;

    /**
     * Instantiates a new [[NewsletterCategory]]
     */
    public abstract newNewsletterCategoryInstanceFromJSON(json: any): NewsletterCategory;
}
