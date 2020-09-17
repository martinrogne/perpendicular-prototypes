import { Address } from '../models/address.model';
import { Profile } from '../models/profile.model';

/**
 * Fetches and store profile data about your current identity. For newsletter related profile information, see
 * [[INewsletterProfileProvider]]
 */
export abstract class IProfileProvider {
  /**
   * Fetches the current users own profile data.
   */
  public abstract getSelf(): Promise<Profile>;

  /**
   * Updates the profile information for the current (Registered) customer.
   * Note: This is only valid for Registered Customers.
   * Pass "undefined" to the various fields to avoid setting them in the server. If you set "null", the value will be removed from the
   * backend.
   *
   */
  public abstract updateProfile(profile: Profile): Promise<Profile>;

  /**
   * Adds a new address to the customers address book. Can be used by both Guest and Registered Customers
   */
  public abstract addAddressToAddressBook(address: Address): Promise<void>;

  /**
   * Updates an existing address in the address book. Can be used by both Guest and Registered Customers
   */
  public abstract updateAddressInAddressBook(address: Address): Promise<void>;

  /**
   * Deletes an address from the customers address book
   */
  public abstract deleteAddressFromAddressBook(address: Address): Promise<void>;

  /**
   * GDPR: Records the change in online marketing consent.
   * Setting to false, might also clear the backend of previously stored
   * marketing related tracking data. However, this is backend specific.
   */
  public abstract changeMarketingConsent(consent: boolean): Promise<void>;

  /**
   * GDPR: Records the users acceptance of a new privacy policy version
   */
  public abstract updatePrivacyPolicyAcceptance(version: string): Promise<void>;

  /**
   * Fetch another users profile
   */
  public abstract getProfileById(id: string): Promise<Profile>;
}
