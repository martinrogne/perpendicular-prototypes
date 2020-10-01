import { Observable } from 'rxjs';
import { Identity } from '../models/identity.model';

/**
 *
 * This service is a stateful identity management service.
 * A customer can be either
 *   - Anonymous (no data outside marketing events stored server side ) (partially implemented)
 *   - Guest user ( One-time shopping account ) (default)
 *   - Registered Customer ( Guest User + username/password for repeat customers. )
 */
export abstract class IIdentityService<IdentityType extends Identity = Identity> {
  public get state(): Observable<IdentityType> {
    throw new Error('Not Implemented');
  }

  /**
   * Log user in, based on credentials
   */
  public abstract login(userName: string, password: string): void;

  /**
   * Clear session, and revert to guestLogin
   */
  public abstract logout(): void;

  /**
   * Set up a guest shopper context. This should be the default starting state for new sessions.
   */
  public abstract guestLogin(): Promise<void>;

  /**
   * Upgrade current guest account to a registered account, by adding a username and password to it. The backend should ensure that
   * all content associated with the current guest user, is now associated with the new Registered User.
   */
  public abstract upgradeToRegisteredCustomer(username: string, password: string): Promise<void>;

  /**
   * Changes password on current account (must be registered customer)
   */
  public abstract changePassword(oldPassword: string, newPassword: string): Promise<void>;

  /**
   * Informs backend to initiate a reset password process. This might involve the user getting a verification token by email, or
   * SMS, or just simply the backend issuing a new password.
   *
   * *NOTE* it is the ProfileService that is responsible for having set a valid email or phone number on the account.
   *
   * @return a promise, optionally containing a security question to ask the user.
   */
  public abstract initiateResetPassword(userIdentification: string): Promise<string>;

  /**
   * performs the actual password reset, or updates an expired password
   * @param userIdentification the logonId the customer uses
   * @param oldPassword the existing password (in case you are using send-temporary-password for resets). Set undefined to ignore
   * @param newPassword the password to set
   * @param verificationText either the answer to a security question, or a verification token sent via SMS or Email,
   *        depending on backend capability.
   */
  public abstract resetPassword(
    userIdentification: string,
    oldPassword: string,
    newPassword: string,
    verificationText: string,
  ): Promise<void>;

  // for admins
  /**
   * Set this session in preview mode, to allow viewing marketing content in the future, and get
   * Information on how marketing spots are evaluated
   */
  public abstract setupPreviewContext(additionalMemberGroups: string[], startDate: Date): Promise<void>;

  /**
   * Call backend to set this session in preview mode.
   */
  public abstract destroyPreviewContext(): void;

  /**
   * Utility function to clear current session and create a new guest sessions
   */
  public abstract resetToGuestIdentity(): Promise<void>;

  /**
   * Utility function to reload the context of the currenty authenticated identity. Generally this WILL be managed
   * by Perpendicular. This should only ever be required for use in external customizations.
   */
  public abstract reloadIdentityContext(): Promise<IdentityType>;

  /**
   * Changes the organization that the user is currently trading on behalf of
   */
  public abstract setActiveOrganization(organizationId: string): void;
}
