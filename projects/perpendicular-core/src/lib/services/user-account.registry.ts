import { UserAccount } from '../models/user-account.model';
import { IRegistry } from './base.registry';

/**
 * A lookup service for detailed [[UserAccount]] information.
 * Will cache data for repeated lookups.
 */
export abstract class IUserAccountRegistry<UserAccountType extends UserAccount = UserAccount> extends IRegistry<UserAccountType> {
  /**
   * Look up all details about the object based on its ID
   * @param id the id of the object to find.
   */
  public abstract getUserAccount(id: string): Promise<UserAccountType>;

  /**
   * Look up a user by his logon id
   */
  public abstract getUserAccountByLogonId(logonId: string): Promise<UserAccountType>;
}
