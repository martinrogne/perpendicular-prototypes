import { Profile } from 'perpendicular-core';

/**
 * Provider specific version of the model
 */
export class WCSProfile extends Profile {
  /**
   * Salutation
   */
  public salutation = '';

  /**
   * Middle name
   */
  public middleName = '';

  /**
   * Photo URL. Defaults to gravatar, if not set from backend.
   */
  public photo = '';

  /**
   * Freeform business title, if jobFunction is not used.
   */
  public businessTitle = '';

  /**
   * Number of people in household.
   * Defaults to NaN if not known or not set.
   */
  public householdSize = 0;

  /**
   * Marital status
   */
  public maritalStatus = '';

  /**
   * number of children
   */
  public numberOfChildren = 0;

  /**
   * Enumerated job function that matches something from MC, for purposes of creating new
   * customer segments.
   */
  public get jobFunction(): string {
    return this.attributes.get('JobFunction') || '';
  }

  /**
   * Enumerated job function that matches something from MC, for purposes of creating new
   * customer segments.
   */
  public set jobFunction(value: string) {
    this.attributes.set('JobFunction', value || '');
  }

  /**
   * Default constructor
   */
  constructor() {
    super();
  }
}
