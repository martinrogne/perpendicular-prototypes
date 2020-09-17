import { BaseModel } from './base.model';

/**
 * A Model class representing SeoPageInfo
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
 * It is better to precalc these in the `SeoPageInfoFactory#newInstanceFromJSON`
 *
 * The `core` version should contain the generic data that can be assumed to be available on any platform.
 * You cannot instantiate this class directly, rather you must use its associated factory.
 * @see ISeoPageInfoFactory
 */
export class SEOPageInfo extends BaseModel {
  /**
   * ID of the SeoPageInfo
   */
  public id?: string;

  /**
   * Indicates if its a category or product
   */
  public pageType = '';
  /**
   *  the id of the category or product
   */
  public pageId?: string;

  /**
   * The page title
   */
  public title = '';

  /**
   * The metadescription
   */
  public metadescription = '';

  /**
   * the keywords
   */
  public keywords = '';
}
