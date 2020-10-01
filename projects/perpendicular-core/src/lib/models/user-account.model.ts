import { BaseModel } from './base.model';

/**
 * A Model class representing a UserAccount.
 *
 * A user account represents a [[Profile]]'s account information, such as whether or not its locked or not.
 * In time this will also be the place for holding some of the content currently only available on the Identity.
 *
 * It contains some basic information that is also available on a [[Profile]], but that is mostly for easy reference if displaying
 * in a grid, without having to fetch each of the corrosponding profiles one at a time.
 *
 * @see IUserAccountFactory
 */
export class UserAccount extends BaseModel {
  /**
   * The display-friendly name of the customer
   */
  public displayName = '';

  /**
   * The firstname of the customer
   */
  public firstName = '';

  /**
   * The lastname of the customer
   */
  public lastName = '';

  /**
   * The logon credentials of the customer
   */
  public logonId = '';

  /**
   * The unique identifier for the customer
   */
  public id?: string;

  /**
   * The state of the customer - 0 for disabled, 1 for enabled
   */
  public state: 'enabled' | 'disabled' = 'enabled';

  /**
   * The parent organization. I.e. where the user is created.
   */
  public parentOrganizationId?: string;
}
