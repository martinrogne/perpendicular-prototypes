import { Injectable } from '@angular/core';
import { IIdentityCacheProvider, Identity, IIdentityFactory } from 'perpendicular-core';

/**
 * A cache layer for storing/persisting user information between visits using local storage
 */
@Injectable()
export class WCSIdentityCacheProvider extends IIdentityCacheProvider {
  /**
   * Temporary work-around for having a feature detecting single provider for server and client
   */
  protected serverIdentity: Identity | null = null;

  constructor(public identityFactory: IIdentityFactory) {
    super();
    this.serverIdentity = identityFactory.newInstance();
  }
  /**
   * Saves the current identity to localStorage
   */
  public save(identity: Identity): void {
    if (identity.wcToken !== undefined) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('WCAuth', JSON.stringify(identity));
      } else {
        this.serverIdentity = identity;
      }
    }
  }

  /**
   * Gets the last stored identity from local storage
   */
  public get(): Identity {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('WCAuth') !== undefined) {
      const identity: Identity = this.identityFactory.newInstanceFromIdentity(JSON.parse(localStorage.getItem('WCAuth') as unknown as string));
      return identity;
    }
    return this.serverIdentity as unknown as Identity;
  }
  /**
   * Clears any cached values
   */
  public clear(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('WCAuth');
    } else {
      this.serverIdentity = this.identityFactory.newInstance();
    }
  }
}
