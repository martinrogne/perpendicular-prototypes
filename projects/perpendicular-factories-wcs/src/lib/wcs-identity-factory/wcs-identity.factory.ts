import { Injectable } from '@angular/core';
import { Identity, IIdentityFactory } from 'perpendicular-core';
import { WCSIdentity } from 'perpendicular-models-wcs';

/**
 * An backend specific factory to create instances of [[Identity]]
 */
@Injectable()
export class WCSIdentityFactory extends IIdentityFactory {
  /**
   * Default constructor
   */
  constructor() {
    super();
  }

  /**
   * Creates a new [[Identity]]
   */
  public newInstance(): Identity {
    return new WCSIdentity();
  }

  /**
   * Deserializes a new  [[Identity]] from a backend response from [[IIdentityProvider]]
   */
  public newInstanceFromJSON(json: any): Identity {
    const result: Identity = this.composeIdentity(json);

    // we cant freeze the result for identity, due to how the remaining fields are populated....
    // FIXME: rewrite identity handling so we can have it be frozen.
    return result;
  }

  /**
   * Deserializes a new  [[Identity]] from a  stored version
   */
  public newInstanceFromIdentity(storedCopy: any): Identity {
    const result = this.newInstance();
    if (storedCopy !== undefined) {
      for (const prop in storedCopy) {
        if (!storedCopy.hasOwnProperty(prop)) {
          continue;
        }
        /* tslint:disable */
        const me: any = result;
        me[prop] = storedCopy[prop];
        /* tslint:enable */
      }
    }
    return result;
  }

  /**
   * Deserializes the main object. Serves as extension point. Each object should have its own
   * composeXXX function.
   */
  protected composeIdentity(json: any): Identity {
    const result = this.newInstance() as Identity;

    if (null != json && json !== undefined) {
      result.isEstablished = true;
      result.userId = json.userId;
      result.wcToken = json.WCToken;
      result.wcTrustedToken = json.WCTrustedToken;
      result.personalizationId = json.personalizationID;
    }

    return result;
  }
}
