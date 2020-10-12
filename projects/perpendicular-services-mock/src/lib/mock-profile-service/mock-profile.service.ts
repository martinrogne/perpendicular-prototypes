import { EventEmitter, Injectable } from '@angular/core';
import { Address, IProfileService, Profile, IIdentityService } from 'perpendicular-core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ModifiableState } from '../testutils/utils';

/**
 * Mock version of [[IProfileService]].
 * Will emit new data from [[ProfileTestDataGenerator]] when [[IdentityService]] emits changes.
 */
@Injectable()
export class MockProfileService extends IProfileService implements ModifiableState<Profile> {
  /**
   * See [[IProfileService]]
   */
  public internalState: BehaviorSubject<Profile>;

  /**
   * See [[IProfileService]]
   */
  public get state(): Observable<Profile> {
    return this.internalState.asObservable();
  }

  /**
   * See [[IProfileService]]
   */
  constructor() {
    super();
    this.internalState = new BehaviorSubject<Profile>(new Profile());

    spyOn(this as IProfileService, 'saveAddress').and.callThrough();
    spyOn(this as IProfileService, 'deleteAddress').and.callThrough();
    spyOn(this as IProfileService, 'updateProfile').and.callThrough();
    spyOn(this as IProfileService, 'changeMarketingConsent').and.callThrough();
    spyOn(this as IProfileService, 'updatePrivacyPolicyAcceptance').and.callThrough();
  }
  /**
   * See [[IProfileService]]
   */
  public saveAddress(anAddress: Address): void {}

  /**
   * See [[IProfileService]]
   */
  public deleteAddress(anAddress: Address): void {}

  /**
   * See [[IProfileService]]
   */
  public updateProfile(profile: Profile): Promise<void> {
    return Promise.resolve();
  }

  /**
   * See [[IProfileService]]
   */
  public changeMarketingConsent(consent: boolean): Promise<void> {
    return Promise.resolve();
  }

  /**
   * See [[IProfileService]]
   */
  public updatePrivacyPolicyAcceptance(version: string): Promise<void> {
    return Promise.resolve();
  }

  /**
   * See [[IProfileService]]
   */
  public emitNewState(data: Profile): void {
    this.internalState.next(data);
  }
}
