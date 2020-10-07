import { UserAccount } from 'perpendicular-core';

/**
 * Provider specific version of the model
 */
export class WCSUserAccount extends UserAccount {
  /**
   * Last session date, if platform allows for it.
   * Currently WCS does not send this in its OOTB code.
   */
  public lastSession: Date | undefined;

  /**
   * Last registration date, if platform allows for it
   * Currently WCS does not send this in its OOTB code.
   */
  public registrationDate: Date | undefined;

  /**
   * Default constructor
   */
  constructor() {
    super();
  }
}
