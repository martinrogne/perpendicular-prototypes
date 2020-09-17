import { Observable } from 'rxjs';

import { UserAccount } from '../models/user-account.model';
import { UserAccountSearchQuery, UserAccountSearchResult, UserAccountSortBy } from '../models/user-account-search.model';
import { ISearchService } from '../services/base.search.service';
import { Organization } from '../models/organization.model';
import { Role } from '../models/role.model';
import { Profile } from '../models/profile.model';

/**
 * Stateful service for operating on [[UserAccountSearch ]].
 */
export abstract class IUserAccountSearchService<
  UserAccountType extends UserAccount = UserAccount,
  UserAccountSearchQueryType extends UserAccountSearchQuery = UserAccountSearchQuery,
  UserAccountSearchResultType extends UserAccountSearchResult<UserAccountType, UserAccountSearchQueryType> = UserAccountSearchResult<
    UserAccountType,
    UserAccountSearchQueryType
  >
> extends ISearchService<UserAccountType, UserAccountSearchQueryType, UserAccountSearchResultType> {
  /**
   * Field to sort by
   */
  public abstract sortBy: UserAccountSortBy;

  /**
   * A string which the customers parent organization's name should contain - case insensetive
   */
  public abstract parentOrganizationName: string;

  /**
   * A string which the customers first name should contain - case insensetive
   */
  public abstract firstName: string;

  /**
   * A string which the customers name name should contain - case insensetive
   */
  public abstract lastName: string;

  /**
   * A string which the customers logon identifier should contain - case insensetive
   */
  public abstract logonId: string;

  /**
   * Account status
   */
  public accountStatus: undefined | 'enabled' | 'disabled';

  /**
   * A parent organization the user should belong to
   */
  public abstract parentOrganizationId: string;

  /**
   * A role the user should have
   */
  public abstract roleId: string;

  /**
   * Determines what kind of user accounts are returned.
   */
  public abstract scope: 'customers' | 'admins' | 'employees';

  /**
   * User actions
   */

  /**
   * Enables a locked account
   */
  public abstract enableUser(user: UserAccountType): void;

  /**
   * Disables an account
   */
  public abstract disableUser(user: UserAccountType): void;

  /**
   * Resets the password for the account
   */
  public abstract resetPasswordFor(user: UserAccountType, password: string): void;

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
  ): Promise<UserAccountType>;

  /**
   * Assigns a role to the user, in an organization.
   * The organization can be either an Organization or an Organizational Unit.
   * The selection of roles is added any existing roles the user has on that organization
   *
   * @param user the recipient of the rights
   * @param organization the organization to add it for
   * @param roles the roles (names) to add
   */
  public abstract grantUserRights(organization: Organization, user: UserAccountType, roles: Role[]): Promise<void>;

  /**
   * Revokes a role to the user, in an organization.
   * The organization can be either an Organization or an Organizational Unit.
   * The selection of roles is removed from any existing roles the user may have
   *
   * @param user the recipient of the rights
   * @param organization the organization to add it for
   * @param roles the roles (names) to add
   */
  public abstract revokeUserRights(organization: Organization, user: UserAccountType, roles: Role[]): Promise<void>;

  /**
   * Returns a list of roles the user holds in the given organization
   */
  public abstract getRolesForUserInOrganization(organization: Organization, user: UserAccountType): Promise<Role[]>;

  /**
   * Updates an user in a buyer organization.
   * Can only be done by administrators (csrs and buyer adminstrators).
   *
   * @param profile the users profile to set
   * @returns a promise that resolves when the profile has been updated.
   */
  public abstract updateProfileForAccount(profile: Profile): Promise<void>;
}
