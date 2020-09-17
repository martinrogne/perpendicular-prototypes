import { Address } from './address.model';
import { BaseModel } from './base.model';

/**
 * This class represents a "Profile" for a *Registered Customer* or *Guest* user.
 * Both Registered Customers and Guest users can have address books, but only Registered Customers have a
 * dedicated firstName, lastName, phone and Email address.
 *
 * Each Address in the address book *can* contain a seperate email or phone number that will be used when
 * notifying the customer that his order is being completed, so be sure to set it.
 */
export class Profile extends BaseModel {
  /**
   * The primary address of the Person.
   */
  public primaryAddress?: Address;

  /**
   * Full address book for the profile. Including the primary address.
   */
  public addressBook: Array<Address> = [];

  /**
   * The first name of the person
   */
  public firstName = '';

  /**
   * The last name of the person
   */
  public lastName = '';

  /**
   * The phone number, without country prefixes
   */
  public phone = '';

  /**
   * The email address of the person
   */
  public email = '';

  /**
   * Birthday
   */
  public dateOfBirth?: Date;

  /**
   * Gender, either Male or Female
   */
  public gender = '';

  /**
   * set of attributes associated with this profile.
   * Ideally, you would not access these directly, but rather provide a specialized
   * [[Profile]] object that accessed known values from this
   */
  public attributes: Map<string, string> = new Map<string, string>();

  /**
   * The ID of the user this profile is for.
   */
  public userId?: string;

  /**
   * Parent organization that this profile is created under
   */
  public parentOrganizationId?: string;

  /**
   * GDPR: has given marketing consent
   */
  public marketingConsent = false;

  /**
   * GDPR: last time marketing consent was updated. This field may or may not be supported
   * by your current backend.
   */
  public marketingConsentLastUpdated?: Date;

  /**
   * GDPR: version of privacy policy that user has accepted.
   * null or undefined if no privacy policy has been accepted yet
   */
  public privacyPolicyAcceptVersion = '';

  /**
   * GDPR: last time marketing consent was updated. This field may or may not be supported
   * by your current backend.
   */
  public privacyPolicyAcceptLastUpdated?: Date;
}
