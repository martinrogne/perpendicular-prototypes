import { BaseModel } from './base.model';

/**
 * A Model class representing Attachment.
 * Current only present on products, but can be reused for other things.
 *
 * The `core` version should contain the generic data that can be assumed to be available on any platform.
 * You cannot instantiate this class directly, rather you must use the IProductFactory.
 * @see IAttachmentFactory
 */
export abstract class Attachment extends BaseModel {
  /**
   * ID of the Attachment
   */
  public id?: string;

  /**
   * Mimetype of attachment, if any
   */
  public mimeType = '';

  /**
   * URL of attachment
   */
  public url = '';

  /**
   * Name of attachment
   */
  public name = '';

  /**
   * Short description of attachment
   */
  public description = '';

  /**
   * Long description of attachment
   */
  public longDescription = '';

  /**
   * the type / classifier of the attachment. I.e. documentation, warrenty, etc
   */
  public usage = '';
}
