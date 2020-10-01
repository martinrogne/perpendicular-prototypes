import { BaseSearchQuery, BaseSearchResult } from './base.search.model';
import { UserAccount } from './user-account.model';

export enum UserAccountSortBy {
  /**
   * Natural sort by id
   */
  SORT_ID = 0,
  /**
   * Sort by id descending
   */
  SORT_ID_DESC,
  /**
   * Sort by firstname
   */
  SORT_FIRSTNAME,
  /**
   * Sort by firstname descending
   */
  SORT_FIRSTNAME_DESC,
  /**
   * Sort by lastname
   */
  SORT_LASTNAME,
  /**
   * Sort by lastname descending
   */
  SORT_LASTNAME_DESC,
  /**
   * Sort by logonId
   */
  SORT_LOGONID,
  /**
   * Sort by logonId, descending
   */
  SORT_LOGONID_DESC,
  /**
   * Sort by registration date, oldest first
   */
  SORT_REGISTRATION_DATE,
  /**
   * Sort by registration date, newest first
   */
  SORT_REGISTRATION_DATE_DESC,
  /**
   * Sort last session date, oldest first
   */
  SORT_LAST_SESION,
  /**
   * Sort last session date, newest first
   */
  SORT_LAST_SESION_DESC,
}

/**
 * A Model class representing UserAccountSearchQuery
 */
export class UserAccountSearchQuery extends BaseSearchQuery {
  /**
   * Field to sort by
   */
  public sortBy: UserAccountSortBy;

  /**
   * Account status
   */
  public accountStatus: undefined | 'enabled' | 'disabled';

  /**
   * A string which the customers parent organization's name should contain - case insensetive
   */
  public parentOrganizationName?: string;

  /**
   * A string which the customers first name should contain - case insensetive
   */
  public firstName?: string;

  /**
   * A string which the customers name name should contain - case insensetive
   */
  public lastName?: string;

  /**
   * A string which the customers logon identifier should contain - case insensetive
   */
  public logonId?: string;

  /**
   * A specific parent organization
   */
  public parentOrganizationId?: string;

  /**
   * A role that the user plays
   */
  public roleId?: string;

  /**
   * Scope of search.
   *
   * 'customers': returns customers from all stores, registered or not, but not users that are only administrative users.
   * 'admins': returns user accounts that have roles other than 'registered user' (typically CSRs will use this)
   * 'employees': returns user accounts that have roles other than 'registered user'
   * (typically b2b customers own administrator will use this)
   */
  public scope: 'customers' | 'admins' | 'employees';

  constructor(q?: UserAccountSearchQuery) {
    super(q);
    if (q) {
      this.firstName = q.firstName;
      this.lastName = q.lastName;
      this.logonId = q.logonId;
      this.parentOrganizationName = q.parentOrganizationName;
      this.parentOrganizationId = q.parentOrganizationId;
      this.roleId = q.roleId;
      this.accountStatus = q.accountStatus;
      this.scope = q.scope;
      this.sortBy = q.sortBy;
    } else {
      this.sortBy = UserAccountSortBy.SORT_LOGONID;
      this.scope = 'employees';
    }
  }
}

/**
 * A Model class representing UserAccountSearchResult
 */
export class UserAccountSearchResult<
  UserAccountType extends UserAccount = UserAccount,
  UserAccountSearchQueryType extends UserAccountSearchQuery = UserAccountSearchQuery
> extends BaseSearchResult<UserAccountType, UserAccountSearchQueryType> {}
