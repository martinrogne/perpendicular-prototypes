import { Identity } from '../models/identity.model';

/**
 * An abstract factory to create instances of [[Identity]]
 */
export abstract class IIdentityFactory {
  /**
   * Creates a new [[Identity]]
   */
  public abstract newInstance(): Identity;

  /**
   * Deserializes a new  [[Identity]] from a backend response from [[IIdentityProvider]]
   */
  public abstract newInstanceFromJSON(json: any): Identity;

  /**
   * Deserializes a new  [[Identity]] from a  stored version
   */
  public abstract newInstanceFromIdentity(storedCopy: any): Identity;
}
