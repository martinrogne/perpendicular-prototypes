import { NewsletterProfile, NewsletterCategory } from '../models/newsletterprofile.model';

/**
 * Provider to fetch newsletter profiles and categories from backend systems.
 */
export abstract class INewsletterProfileProvider {

    /**
     * Fetch customers current newsletter profile
     */
    public abstract getSelf(): Promise<NewsletterProfile>;

    /**
     * Fetch available newsletter profile categories
     */
    public abstract getNewsletterCategories(): Promise<Array<NewsletterCategory>>;

    /**
     * Update customers current subscriptions and opt in/out preferences
     */
    public abstract updateNewsletterProfile(newsletterCategoryIds: string[], wantSMS?: boolean, wantEmail?: boolean): Promise<void>;
}
