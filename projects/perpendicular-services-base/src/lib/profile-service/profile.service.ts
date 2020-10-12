import { timeout, switchMap, filter, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { IProfileProvider, IProfileFactory, Identity, Profile, Address, IIdentityService, IProfileService } from 'perpendicular-core';
/**
 *   This service holds the extended person information used for registered customers.
 */
@Injectable()
export class ProfileService extends IProfileService {

  // current state
  protected internalProfile: Profile;

  // a queue of pending loads
  protected queue: Subject<number>;

  // event sink
  protected internalState: BehaviorSubject<Profile>;

  // items in constructor are added to the class..
  constructor(public profileProvider: IProfileProvider,
              public identityService: IIdentityService,
              public profileFactory: IProfileFactory) {
    super();
    this.internalProfile = this.profileFactory.newInstance();
    this.internalState = new BehaviorSubject<Profile>(this.internalProfile);

    this.queue = new Subject<number>();
    this.queue
      .asObservable()
      .pipe(switchMap((x: number) => this.profileProvider.getSelf()))
      .subscribe(
        (res: Profile) => {
          this.internalProfile = res;
          this.internalState.next(res);
        },
        err => {
          this.internalState.error(err);
        },
      );

    this.identityService.state.subscribe(identity => {
      this.getSelf();
    });
  }

  /**
   * Upserts the address.
   *
   * If the nickname is not present in the addressbook, it is assumed to be an add operation, otherwise
   * its an update.
   */
  public saveAddress(address: Address): void {
    if (this.internalProfile.addressBook.find(x => x.nickName === address.nickName)) {
      return this.updateAddress(address);
    } else {
      return this.addToAddressBook(address);
    }
  }

  /**
   * Removes an address in the address book.
   */
  public deleteAddress(anAddress: Address): void {
    const aPromise: Promise<void> = this.profileProvider.deleteAddressFromAddressBook(anAddress);

    aPromise.then(qx => {
      // we reload the person, just to be sure.....
      this.getSelf();
    });
  }

  /**
   * Other interested parties can subscribe to this to get updates when the identity data changes.
   */
  public get state(): Observable<Profile> {
    return this.internalState;
  }

  /**
   * Updates the profile information for the current (Registered) customer.
   * Note: This is only valid for Registered Customers.
   * New object based version. Use ProfileFactory#newInstanceFromProfile to get a writable version of the current profile.
   * Updates the profile fields for name, email, demographics and business profile.
   *
   * Does not update address information or GDPR related fields.
   */
  public updateProfile(profile: Profile): Promise<void> {
    return this.profileProvider.updateProfile(profile).then(updatedProfile => {
      return this.getSelf();
    });
  }

  /**
   * GDPR: Records the change in online marketing consent.
   * Setting to false, might also clear the backend of previously stored
   * marketing related tracking data. However, this is backend specific.
   */
  public changeMarketingConsent(consent: boolean): Promise<void> {
    return this.profileProvider.changeMarketingConsent(consent).then(updatedProfile => {
      return this.getSelf();
    });
  }

  /**
   * GDPR: Records the users acceptance of a new privacy policy version
   */
  public updatePrivacyPolicyAcceptance(version: string): Promise<void> {
    return this.profileProvider.updatePrivacyPolicyAcceptance(version).then(updatedProfile => {
      return this.getSelf();
    });
  }

  /**
   * Fetches the Person from backend, if identity is a registered user.
   */
  protected getSelf(): void {
    this.queue.next(new Date().getTime());
  }

  /**
   * Adds an address to the address book. The NickName must be unique from other addresses in the address book.
   */
  protected addToAddressBook(newAddress: Address): void {
    const aPromise: Promise<void> = this.profileProvider.addAddressToAddressBook(newAddress);
    aPromise.then(qx => {
      this.getSelf();
    });
  }

  /**
   * Updates an address in the address book.
   */
  protected updateAddress(newAddress: Address): void {
    // we assume the address is already on the profile, so we look for it.
    let oldAddr: Address | undefined;
    if (this.internalProfile) {
      oldAddr = this.internalProfile.addressBook.find(x => x.nickName === newAddress.nickName);
    }

    const aPromise: Promise<void> = this.profileProvider.updateAddressInAddressBook(newAddress);
    aPromise.then(qx => {
      // we reload the person, just to be sure.....
      this.getSelf();
    });
  }
}
