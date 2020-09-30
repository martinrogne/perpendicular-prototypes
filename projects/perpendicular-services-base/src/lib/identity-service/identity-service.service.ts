import { filter } from 'rxjs/operators';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { IIdentityCacheProvider, IIdentityProvider, INotificationService, IIdentityFactory } from 'perpendicular-core';
import { IIdentityService } from 'perpendicular-core';
import { Identity } from 'perpendicular-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDENTITY_SERVICE_FETCH_ENTITLED_ORGS } from 'perpendicular-core';

export const BOOTSTRAP_IDENTITY = new InjectionToken('BOOTSTRAP_IDENTITY');
/**
 * This service holds state about the current users authentication context.
 * It has functions to create guest and registered user contexts.
 */
@Injectable()
export class IdentityService extends IIdentityService {
  // Indicates if we should spend an additional roundtrip when establishing the user identity, to fetch
  // the set of organizations that can be traded for.
  // Can be controlled via the IDENTITY_SERVICE_FETCH_ENTITLED_ORGS injection token
  protected fetchOrganizations = false;

  // current state
  protected internalIdentity: Identity;

  // event sink
  protected internalState: BehaviorSubject<Identity>;

  /**
   * Internal indicator that someone is waiting for the resetGuestLogin to finish
   */
  protected guestIdentityLoginInProgress: Promise<void> | undefined | null;

  /**
   * Constructor for IdentityService. Will have fields populated by Dependency Injection
   *
   * @param http A HTTP connection instance
   * @param identityUrlProvider A backend provider to facilitate authentication
   * @param identityCache an a cache to ensure we can store the users authentication token both server side and client side
   */
  constructor(
    public identityProvider: IIdentityProvider,
    public identityCache: IIdentityCacheProvider,
    public notificationService: INotificationService,
    public identityFactory: IIdentityFactory,
    @Inject(BOOTSTRAP_IDENTITY)
    @Optional()
    protected boostrapidentity: Identity,
    @Inject(IDENTITY_SERVICE_FETCH_ENTITLED_ORGS)
    @Optional()
    protected configFetchOrganizations: boolean,
  ) {
    super();
    this.fetchOrganizations = configFetchOrganizations || false;
    const defaultIdentity: Identity = this.identityFactory.newInstance();
    this.internalState = new BehaviorSubject<Identity>(defaultIdentity);

    // to update local storage
    this.internalState.subscribe(x => {
      // as the BehaviourSubject always returns at least the default identity,
      // we have to check that is a valid identity before comitting it to local storage
      this.internalIdentity = x;

      // do not persist, the boostrap identity
      if (this.internalIdentity !== this.boostrapidentity) {
        this.identityCache.save(this.internalIdentity);
      }
    });

    if (!this.boostrapidentity) {
      const tmpIdent = identityCache.get();
      if (tmpIdent.wcToken !== undefined) {
        tmpIdent.isEstablished = true;
        this.internalIdentity = tmpIdent;
        this.reloadIdentityContext();
      } else {
        this.guestLogin().then(x => x);
      }
    } else {
      this.internalState.next(this.boostrapidentity);
    }

    this.internalIdentity = defaultIdentity;
  }

  /**
   * Returns the currently established authentication context. Subscribe to this, to be notified when users identity changes, either due
   * to login, or logout.
   */
  public get state(): Observable<Identity> {
    return this.internalState.asObservable().pipe(filter(x => x.isEstablished));
  }

  /**
   * Log user in, based on credentials
   */
  public login(userName: string, password: string): void {
    this.identityProvider.login(userName, password, this.internalIdentity).then(identity => {
      this.internalIdentity = identity;

      if (this.fetchOrganizations) {
        this.identityProvider
          .getOrganizations(this.internalIdentity)
          .then(orgIds => {
            this.internalIdentity.allowedOrganizations = orgIds;
          })
          .then(y => {
            this.reloadIdentityContext().then(x => {
              this.notificationService.success('__USER_LOGIN_SUCCESS', 'PERPENDICULAR_IDENTITYSERVICE_USER_LOGIN_SUCCESS', x);
              return;
            });
          });
      } else {
        this.reloadIdentityContext().then(x => {
          this.notificationService.success('__USER_LOGIN_SUCCESS', 'PERPENDICULAR_IDENTITYSERVICE_USER_LOGIN_SUCCESS', x);
          return;
        });
      }
    });
  }

  /**
   * Clear session, and revert to guestLogin
   */
  public logout(): void {
    this.identityProvider
      .logout(this.internalIdentity)
      .then(anonymousidentity => {
        this.resetToGuestIdentity().then(x => {
          this.notificationService.success('__USER_LOGOUT_SUCCESS', 'PERPENDICULAR_IDENTITYSERVICE_USER_LOGOUT');
        });
      })
      .catch(error => {
        if (error.status === 401 || error.status === 403) {
          this.resetToGuestIdentity();
        }
      });
  }

  /**
   * Changes the organization id in the current session, and reloads the context. Will emit the changed identity.
   */
  public setActiveOrganization(organizationId: string): void {
    this.identityProvider.setActiveOrganization(this.internalIdentity, organizationId).then(x => {
      this.reloadIdentityContext().then(z => {
        this.notificationService.success('__USER_ORGANIZATION_CHANGE_SUCCESS', 'PERPENDICULAR_IDENTITYSERVICE', {
          organizationId,
        });
      });
    });
  }

  /**
   * Establishes a guest session. A guest session is an unregistered shopper session. Guests can complete checkouts, but
   * typically can't access My Account.
   * Set up a guest shopper context. This should be the default starting state for new sessions.
   */
  public guestLogin(): Promise<void> {
    return this.identityProvider.guestLogin().then(identity => {
      this.internalState.next(identity);
      return;
    });
  }

  /**
   * Upgrade current guest account to a registered account, by adding a username and password to it. The backend should ensure that
   * all content associated with the current guest user, is now associated with the new Registered User.
   */
  public upgradeToRegisteredCustomer(username: string, password: string): Promise<void> {
    return this.identityProvider.register(username, password, this.internalIdentity).then(identity => {
      this.internalIdentity = identity;

      return this.reloadIdentityContext().then(contextIdentity => {
        this.notificationService.success('__USER_ACCOUNT_CREATED', 'PERPENDICULAR_IDENTITYSERVICE_USER_ACCOUNT_CREATED');
        return;
      });
    });
  }

  /**
   * Changes password on current account (must be registered customer)
   */
  public changePassword(oldPassword: string, newPassword: string): Promise<void> {
    // TODO verify that user is logged in, use notification framework to raise messages to UI
    return this.identityProvider
      .changePassword(oldPassword, newPassword, this.internalIdentity)
      .then(x => {
        this.notificationService.success('__USER_PASSWORD_CHANGED', 'PERPENDICULAR_IDENTITYSERVICE_USER_PASSWORD_CHANGE_SUCCESS');
      })
      .catch(err => {
        // FIXME: Should this be left to the underlying provider to raise?
        this.notificationService.error('__USER_PASSWORD_CHANGED_ERROR', 'PERPENDICULAR_IDENTITYSERVICE_USER_PASSWORD_CHANGE_ERROR', err);
        return Promise.reject(err);
      });
  }

  /**
   * Informs backend to initiate a reset password process. This might involve the user getting a verification token by email, or
   * SMS, or just simply the backend issuing a new password.
   *
   * *NOTE* it is the ProfileService that is responsible for having set a valid email or phone number on the account.
   *
   * @return a promise, optionally containing a security question to ask the user.
   */
  public initiateResetPassword(userIdentification: string): Promise<string> {
    return this.identityProvider.initiateResetPassword(userIdentification, this.internalIdentity);
  }

  /**
   * performs the actual password reset, or updates an expired password
   * @param userIdentification the logonId the customer uses
   * @param oldPassword the existing password (in case you are using send-temporary-password for resets). Set undefined to ignore
   * @param newPassword the password to set
   * @param verificationText either the answer to a security question, or a verification token sent via SMS or Email,
   *        depending on backend capability.
   */
  public resetPassword(userIdentification: string, oldPassword: string, newPassword: string, verificationText: string): Promise<void> {
    return this.identityProvider.resetPassword(userIdentification, oldPassword, newPassword, verificationText, this.internalIdentity);
  }

  // for admins
  /**
   * Set this session in preview mode, to allow viewing marketing content in the future, and get
   * Information on how marketing spots are evaluated
   */
  public setupPreviewContext(additionalMemberGroups: string[] = [], startDate: Date = new Date()): Promise<void> {
    // try to get a preview token from WCS
    return this.identityProvider
      .setupPreviewContext(additionalMemberGroups, startDate, this.internalIdentity)
      .then(previewToken => {
        this.internalIdentity.inPreviewMode = true;
        this.internalIdentity.previewToken = previewToken;
        this.internalState.next(this.internalIdentity);
        return Promise.resolve();
      })
      .catch(err => {
        // ok, so we didnt get it, so we still set the field, in case other services can use it.
        this.internalIdentity.inPreviewMode = true;
        this.internalState.next(this.internalIdentity);
        return Promise.resolve();
      });
  }

  /**
   * Call backend to set this session in preview mode.
   */
  public destroyPreviewContext(): void {
    this.internalIdentity.previewToken = '';
    this.internalIdentity.inPreviewMode = false;
    this.internalState.next(this.internalIdentity);
  }

  /**
   * Utility function to clear current session and create a new guest sessions
   */
  public resetToGuestIdentity(): Promise<void> {
    if (!this.guestIdentityLoginInProgress) {
      this.identityCache.clear();
      this.guestIdentityLoginInProgress = this.guestLogin();
    }
    // return the promise that was either established just now, or that someone else is
    // already waiting for. In either case, make sure we set the internal mutex to null
    // afterwards. This is done to avoid a guest-login-storm, when the site starts up with
    // an invalid token, and 10 different services all call here to reset the users identity.
    return this.guestIdentityLoginInProgress
      .then(x => {
        this.guestIdentityLoginInProgress = null;
      })
      .catch(e => {
        this.guestIdentityLoginInProgress = null;
      });
  }

  /**
   * Utility function for forcing a reload of the context for the currently authenticated identity
   */
  public reloadIdentityContext(): Promise<Identity> {
    return this.identityProvider.getIdentityContext(this.internalIdentity).then(x => {
      return this.identityProvider.getRoles(x).then(roles => {
        x.roles = roles;
        this.internalState.next(x);

        return x;
      });
    });
  }
}
