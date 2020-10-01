import { UserAccountSearchResult, UserAccountSearchQuery } from './../models/user-account-search.model';
import { UserAccount } from '../models/user-account.model';
import { ISearchFactory } from '../factories/base.factory';

/**
 * An abstract factory to create instances of [[UserAccount]]
 */
export abstract class IUserAccountFactory extends ISearchFactory<UserAccount, UserAccountSearchQuery, UserAccountSearchResult> {}
