import { UserAccountSearchQuery, UserAccountSearchResult } from './../models/user-account-search.model';
import { UserAccount } from '../models/user-account.model';
import { ISearchProvider } from '../providers/base.search.provider';
import { Organization } from '../models/organization.model';
import { Role } from '../models/role.model';
import { Profile } from '../models/profile.model';

/**
 * Provider to fetch [[UserAccount]] from backend systems.
 */
export abstract class IUserAccountProvider extends ISearchProvider<UserAccount, UserAccountSearchQuery, UserAccountSearchResult> {
  /**
   * Loads single entry from backend
   */
  public abstract getUserAccountById(id: string): Promise<UserAccount>;

  /**
   * Loads single entry from backend based on logon id
   */
  public abstract getUserAccountByLogonId(logonId: string): Promise<UserAccount>;

  /**
   * Disables a given user, identified by the customers unique identifier
   */
  public abstract disableUser(user: UserAccount): Promise<void>;
  /**
   * Enables a given user, identifier by the customers unique identifier
   */
  public abstract enableUser(user: UserAccount): Promise<void>;

  /**
   * Resets the password for a given user, with the user being identified by their unique identifier.
   * This will only work, if the callee has administrative rights over the UserAccount in question.
   */
  public abstract resetPassword(user: UserAccount, password: string): Promise<void>;

  /**
   * Registers a new user in a buyer organization.
   * Can only be done by administrators (csrs and buyer adminstrators)
   * The user will have the minimal set of rights in the organization.
   *
   * After creation, the user will not have any addresses. Use the [[ProfileService]] to
   * set these, after creation is complete.
   *
   * @param organization the organization to create the user user in
   * @param the user to create
   * @returns the id of the new user. Use the registry to load his profile
   */
  public abstract registerUser(
    organization: Organization,
    firstName: string,
    lastName: string,
    logonId: string,
    primaryEmail: string,
    primaryPhone: string,
  ): Promise<UserAccount>;

  /**
   * Assigns a role to the user, in an organization.
   * The organization can be either an Organization or an Organizational Unit.
   * The selection of roles is added to any existing roles the user have on that organization
   */
  public abstract grantUserRights(organization: Organization, user: UserAccount, roles: Role[]): Promise<void>;

  /**
   * Revokes a role to the user, in an organization.
   * The organization can be either an Organization or an Organizational Unit.
   * The selection of roles is removed from any existing roles the user may have
   */
  public abstract revokeUserRights(organization: Organization, user: UserAccount, roles: Role[]): Promise<void>;

  /**
   * Returns a list of roles the user holds in the given organization
   */
  public abstract getRolesForUserInOrganization(organization: Organization, user: UserAccount): Promise<Role[]>;

  /**
   * Updates an user in a buyer organization.
   * Can only be done by administrators (csrs and buyer adminstrators).
   *
   * @param profile: Profile
   */
  public abstract updateProfileForAccount(profile: Profile): Promise<void>;
}
