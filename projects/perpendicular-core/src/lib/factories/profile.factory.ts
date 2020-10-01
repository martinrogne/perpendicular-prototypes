import { Inject, Injectable } from '@angular/core';

import { Profile } from '../models/profile.model';

/**
 * A factory to deserialize profile information about a user from WebSphere Commerce.
 */
@Injectable()
export abstract class IProfileFactory {
  /**
   * Instantiates a new profile model.
   */
  public abstract newInstance(): Profile;

  /**
   * Instantiates a new Profile object, and deserializes the json coming from WebSphere Commerce.
   */
  public abstract newInstanceFromJSON(json: any): Profile;

  /**
   * Copy constructor. Used by CSRs to create a writable copy of the existing object when making
   * changes to other users profile.
   */
  public abstract newInstanceFromProfile(profile: Profile): Profile;
}
