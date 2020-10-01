import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { Address } from '../models/address.model';

/**
 * UI stateful service that contains and exposes the Profile data and actions related to the current [[Identity]]
 *
 * Profile information is seperate from Identity information. Profile information are things like addresses, passwords etc.
 */
export abstract class IProfileService<ProfileType extends Profile = Profile, AddressType extends Address = Address> {
  /**
   * Subscribe to this to get information about the current users profile information.
   */
  public get state(): Observable<ProfileType> {
    throw new Error('Not Implemented');
  }

  /**
   * Notification service to other services that an address was saved.
   *
   * FIXME: See if we can get out of this.
   */
  public abstract addressChanged: EventEmitter<AddressType>;

  /**
   * Upserts the address.
   *
   * If the nickname is not present in the addressbook, it is assumed to be an add operation, otherwise
   * its an update.
   */
  public abstract saveAddress(address: Address): void;

  /**
   * Removes an address in the address book.
   */
  public abstract deleteAddress(anAddress: AddressType): void;

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
   * Updates the profile information for the current (Registered) customer.
   * Note: This is only valid for Registered Customers.
   */
  public abstract updateProfile(profile: ProfileType): Promise<void>;
}
