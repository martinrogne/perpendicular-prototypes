import { BaseModel } from './base.model';

/**
 * This class represents a newsletter category
 */
export class NewsletterCategory extends BaseModel {
    /**
     * Internal ID / CODE
     */
    public id?: string;

    /**
     * Long Description of the newsletter category
     */
    public description = '';

    /**
     * Displayname for the newsletter category
     */
    public displayName = '';

}

/**
 * This class represents a customers preferences regarding newsletters
 */
export class NewsletterProfile extends BaseModel {
    /**
     * Opt in for SMS notifications
     */
    public wantSMS = false;

    /**
     * Opt-in for E-mail notifications
     */
    public wantEmails = false;

    /**
     * Newsletter categories the customer has signed up for. References [[NewsletterCategory]]
     */
    public newsletterCategoryIds: string[] = [];

}
