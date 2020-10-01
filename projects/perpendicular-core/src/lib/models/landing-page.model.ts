import { BaseModel } from './base.model';

/**
 * A Model class representing LandingPage
 *
 * TODO: Add public fields and properties.
 * Please remember that this will be an immutable, so avoid doing
 * expensive operations in getter properties, like
 * ```
 *    public get mySpecialAttribute(): string {
 *       if (this.attributes) {
 *          return this.attributes.find(x => x.name === 'mySpecialAttribute').value;
 *       }
 *    }
 * ```
 * It is better to precalc these in the `LandingPageFactory#newInstanceFromJSON`
 *
 * The `core` version should contain the generic data that can be assumed to be available on any platform.
 * You cannot instantiate this class directly, rather you must use its associated factory.
 * @see ILandingPageFactory
 */
export abstract class LandingPage extends BaseModel {
  /**
   * ID of the LandingPage
   */
  public searchTerm?: string;

  /**
   * The URL of the landing page
   */
  public redirectUrl?: string;

  /**
   * Is the URL absolute or relative
   */
  public isAbsolute = false;
}
