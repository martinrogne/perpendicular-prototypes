import { LandingPage } from '../models/landing-page.model';
import { IRegistry } from './base.registry';

/**
 * A lookup service for detailed [[LandingPage]] information.
 * Will cache data for repeated lookups.
 */
export abstract class ILandingPageRegistry<LandingPageType extends LandingPage = LandingPage> extends IRegistry<LandingPageType> {
  /**
   * Look up all details about the object based on its ID
   * @param searchTerm the searchTerm of the object to find.
   */
  public abstract getLandingPageBySearchTerm(searchTerm: string): Promise<LandingPageType>;

  /**
   * Optionally, add additional ways of lookup up an object, by adding more getXXX functions.
   * public abstract getLandingPageByOtherMeans(otherParameter1: string, otherParameter2): Promise<LandingPage>;
   */
}
