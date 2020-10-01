import { Organization } from './../models/organization.model';
import { Identity } from '../models/identity.model';
import { Role } from '../models/role.model';

/**
 * The main interface for establishing an identity with a backend service.
 * FIXME: Should only contain the actual external functions? Shold perform the lookups itself, rather than
 * relying on the service doing it.
 */
export abstract class IIdentityProvider {
  /**
   * Log user in, based on credentials
   * @param userName the username to try to log in as
   * @param password the password to use
   * @param identity the current (guest) identity from which to migrate open baskets, added addresses etc
   */
  public abstract login(userName: string, password: string, identity: Identity): Promise<Identity>;

  /**
   * Clear session, and revert to guestLogin
   * @param identity the identity token to invalidate serverside.
   */
  public abstract logout(identity: Identity): Promise<void>;

  /**
   * Set up a guest shopper context. This should be the default starting state for new sessions.
   */
  public abstract guestLogin(): Promise<Identity>;

  /**
   * Returns roles associated with current user.
   * @param identity the identity for which to fetch roles
   */
  public abstract getRoles(identity: Identity): Promise<Role[]>;

  /**
   * Returns organization-ids for which this user is allowed to trade
   * @param identity the identity for which to fetch roles
   */
  public abstract getOrganizations(identity: Identity): Promise<Organization[]>;

  /**
   * Sets the active organization for which the user is trading
   * @param identity the identity for which to fetch roles
   */
  public abstract setActiveOrganization(identity: Identity, organizationId: string): Promise<void>;

  /**
   * Returns the full context about the currently authenticated identity.
   * @param identity the identity for which to fetch the context for
   */
  public abstract getIdentityContext(identity: Identity): Promise<Identity>;

  /**
   * Upgrade current guest account to a registered account, by adding a username and password to it. The backend should ensure that
   * all content associated with the current guest user, is now associated with the new Registered User.
   * @param username the username to associate with the current (guest) identity
   * @param password the password to assiciate with the current (guest) identity
   * @param identity the current guest identity the user is operating under.
   */
  public abstract register(username: string, password: string, identity: Identity): Promise<Identity>;

  /**
   * Changes password on current account (must be registered customer)
   * @param oldPassword the previous password
   * @param newPassword the new password
   * @param identity the (registered customer) identity of the current user
   */
  public abstract changePassword(oldPassword: string, newPassword: string, identity: Identity): Promise<void>;

  /**
   * Informs backend to initiate a reset password process. This might involve the user getting a verification token by email, or
   * SMS, or just simply the backend issuing a new password.
   *
   * *NOTE* it is the ProfileService that is responsible for having set a valid email or phone number on the account.
   * @param userIdentification either email or username of user trying to reset their password.
   * @param the guest identity to which the backend can issue a password reset token.
   * @return a promise, optionally containing a security question to ask the user.
   */
  public abstract initiateResetPassword(userIdentification: string, identity: Identity): Promise<string>;

  /**
   * performs the actual password reset, or updates expired password
   * @param userIdentification something that identifies the user trying to change his password.
   *        Can be logonId or email or whatever the backend requires
   * @param oldPassword the existing password (in case of updating an expired password). Set undefined to ignore
   * @param newPassword the password to set
   * @param verificationText either the answer to a security question, or a verification token sent via SMS or Email,
   *        depending on backend capability.
   * @param the guest identity to which the backend has issued a password reset token
   */
  public abstract resetPassword(
    userIdentification: string,
    oldPassword: string,
    newPassword: string,
    verificationText: string,
    identity: Identity,
  ): Promise<void>;

  // for admins
  /**
   * Set this session in preview mode, to allow viewing marketing content in the future, and get
   * Information on how marketing spots are evaluated
   *
   * @param additionalMemberGroups optional, if not-null, this should be a list of
   *        customer segment ids to start the preview context with.
   * @param startDate optional, if not null should be the date at which to preview the site.
   * @param the registered customer identity  (which have appropriate roles) to which the backend can issue a preview token
   * @return the preview token
   */
  public abstract setupPreviewContext(additionalMemberGroups: string[], startDate: Date, identity: Identity): Promise<string>;
}
