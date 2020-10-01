import { LandingPage } from '../models/landing-page.model';

/**
 * Provider to fetch [[LandingPage]] from backend systems.
 */
export abstract class ILandingPageProvider {
  /**
   * Loads single entry from backend
   */
  public abstract getLandingPageBySearchTerm(searchTerm: string): Promise<LandingPage>;
}
