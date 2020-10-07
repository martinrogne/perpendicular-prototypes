import { Attachment } from 'perpendicular-core';

/**
 * Provider specific version of the model
 */
export class WCSAttachment extends Attachment {
  /**
   * Image icon url, for the file type that represents the attachments mimetype, and/or extension
   */
  public documentTypeImageURL = '';

  /**
   * Default constructor
   */
  constructor() {
    super();
  }
}
