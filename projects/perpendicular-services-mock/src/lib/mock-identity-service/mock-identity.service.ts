import { Injectable } from '@angular/core';
import { Identity, IIdentityService, IIdentityFactory } from 'perpendicular-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModifiableState } from '../testutils/utils';

/**
 * Mock version of [[IIdentityService]], returns test data from [[IdentityTestDataGenerator]]
 *
 *
 * # Test data
 * | Log in as | To become | Notes |
 * |-----------|-----------|-------|
 * | reguserXX | Registered Customer | Replace XX with number. I.e. reguser1, reguser2 |
 * | admin1 | Site Admin | |
 *
 * The `resetToGuestUser` will emit a new guest identity.
 * The `logout` will emit a new guest identity
 *
 */
@Injectable()
export class MockIdentityService extends IIdentityService implements ModifiableState<Identity> {
  /**
   * See [[IIdentityService]]
   */
  public internalState: BehaviorSubject<Identity>;

  /**
   * See [[IIdentityService]]
   */
  constructor(protected factory: IIdentityFactory) {
    super();
    this.internalState = new BehaviorSubject(this.factory.newInstance());

    spyOn(this as IIdentityService, 'resetToGuestIdentity').and.callThrough();
    spyOn(this as IIdentityService, 'destroyPreviewContext').and.callThrough();
    spyOn(this as IIdentityService, 'setupPreviewContext').and.callThrough();
    spyOn(this as IIdentityService, 'resetPassword').and.callThrough();
    spyOn(this as IIdentityService, 'initiateResetPassword').and.callThrough();
    spyOn(this as IIdentityService, 'changePassword').and.callThrough();
    spyOn(this as IIdentityService, 'upgradeToRegisteredCustomer').and.callThrough();
    spyOn(this as IIdentityService, 'guestLogin').and.callThrough();
    spyOn(this as IIdentityService, 'logout').and.callThrough();
    spyOn(this as IIdentityService, 'login').and.callThrough();
    spyOn(this as IIdentityService, 'reloadIdentityContext').and.callThrough();
  }

  /**
   * See [[IIdentityService]]
   */
  public reloadIdentityContext(): Promise<Identity> {
    const identity = this.factory.newInstance();
    return Promise.resolve(identity);
  }

  /**
   * See [[IIdentityService]]
   */
  public get state(): Observable<Identity> {
    return this.internalState.asObservable();
  }

  /**
   * See [[IIdentityService]]
   */
  public login(userName: string, password: string): void {
  }

  /**
   * See [[IIdentityService]]
   */
  public logout(): void {}

  /**
   * See [[IIdentityService]]
   */
  public guestLogin(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * See [[IIdentityService]]
   */
  public upgradeToRegisteredCustomer(username: string, password: string): Promise<void> {
    return Promise.resolve();
  }

  /**
   * See [[IIdentityService]]
   */
  public changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return Promise.resolve();
  }

  /**
   * See [[IIdentityService]]
   */
  public initiateResetPassword(userIdentification: string): Promise<string> {
    return Promise.resolve('');
  }

  /**
   * See [[IIdentityService]]
   */
  public resetPassword(userIdentification: string, newPassword: string, verificationText: string): Promise<void> {
    return Promise.resolve();
  }

  /**
   * See [[IIdentityService]]
   */
  public setupPreviewContext(additionalMemberGroups: string[], startDate: Date): Promise<void> {
    return Promise.resolve();
  }

  /**
   * See [[IIdentityService]]
   */
  public destroyPreviewContext(): void {}

  /**
   * See [[IIdentityService]]
   */
  public resetToGuestIdentity(): Promise<void> {
    return this.guestLogin();
  }

  /**
   * See [[IIdentityService]]
   */
  public emitNewState(data: Identity): void {
    this.internalState.next(data);
  }

  /**
   * See [[IIdentityService]]
   */
  public setActiveOrganization(organizationId: string): void {}
}
