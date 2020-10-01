import { Profile } from '../models/profile.model';
import { IRegistry } from './base.registry';

/**
 * A lookup service for detailed [[Profile]] information.
 * Will cache data for repeated lookups.
 */
export abstract class IProfileRegistry<ProfileType extends Profile = Profile> extends IRegistry<ProfileType> {
  /**
   * Look up all details about the object based on its ID
   * @param id the id of the object to find.
   */
  public abstract getProfileById(id: string): Promise<ProfileType>;
}
