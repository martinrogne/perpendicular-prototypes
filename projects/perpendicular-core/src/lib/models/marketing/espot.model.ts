import { BaseModel } from '../base.model';
import { MarketingContent } from './marketing-content.model';

/**
 * Contains the result of calling the backends marketing engine to find out what should be shown at a
 * specific section of the screen. Note, you can get a mix of products, image assets and text content returned
 * in the same call.
 */
export class ESpot extends BaseModel {
  /**
   * Internal identifier as to which marketing spot on the website this is related to.
   */
  public espotId?: string;

  /**
   * External identifier as to which marketing spot on the website this is related to.
   */
  public espotName = '';

  /**
   * The actual content of the spot, which may be a list of different types of content data, such as images
   * HTML, products, categories and other.
   */
  public content: Array<MarketingContent> = [];

  /**
   * The titles for the content, which may be of the same varying types at the content itself. They are, however,
   * limited to the actual content types (images, text, HTML, files).
   */
  public titles: Array<MarketingContent> = [];

  /**
   * The preview report associated with this viewing of the espot. This is only available for administrative users
   * who are in preview mode.
   */
  public previewReport: string[] = [];

  /**
   * Indicates whether this marketing spots contents are based on the user and/or cart, or have other dynamic properties.
   */
  public isDynamic = false;

  /**
   * Indicates when the marketing data should next be updated, if its a dynamic entry.
   * For static entries, this will be a date far in the future.
   */
  public nextUpdateDeadline?: Date;
}
