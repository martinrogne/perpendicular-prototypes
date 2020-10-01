import { LandingPage } from '../models/landing-page.model';

/**
 * An abstract factory to create instances of [[LandingPage]]
 */
export abstract class ILandingPageFactory {
  /**
   * Creates a new [[LandingPage]]
   */
  public abstract newInstance(): LandingPage;

  /**
   * Deserializes a new  [[LandingPage]] from a backend response from [[ILandingPageProvider]]
   */
  public abstract newInstanceFromJSON(searchTerm: string, json: any): LandingPage;
}
