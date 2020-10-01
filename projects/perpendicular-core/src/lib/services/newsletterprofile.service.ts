import { Observable } from 'rxjs';
import { NewsletterProfile, NewsletterCategory } from '../models/newsletterprofile.model';

/**
 * Stateful service that represents the customers newsletter preferences.
 */
export abstract class INewsletterProfileService<
  NewsletterProfileType extends NewsletterProfile = NewsletterProfile,
  NewsletterCategoryType extends NewsletterCategory = NewsletterCategory
> {
  /**
   * Subscribe to this to get information about the current users  newletter
   * profile information.
   */
  public get state(): Observable<NewsletterProfileType> {
    throw new Error('Not Implemented');
  }

  /**
   * Updates customers newsletter profile, with subscriptions and opt-in/out preferences.
   *
   * @param newsletterCategoryIds identifiers of newsletter categories to subscribe to. This is the complete list of
   *        subscriptions.
   * @param wantSMS optional argument, to set customers Opt-in/out preference for SMS notifications
   * @param wantEmail optional argument to set customers Opt-in/out preference for email notifications
   */
  public abstract updateNewsletterProfile(newsletterCategoryIds: string[], wantSMS?: boolean, wantEmail?: boolean): void;

  /**
   * Returns the set of defined newsletter categories for the site.
   */
  public abstract getNewsletterCategories(): Promise<NewsletterCategoryType[]>;
}
