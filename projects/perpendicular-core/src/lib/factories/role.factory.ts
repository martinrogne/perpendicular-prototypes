import { Role } from '../models/role.model';

/**
 * An abstract factory to create instances of [[Role]]
 */
export abstract class IRoleFactory {
  /**
   * Creates a new [[Role]]
   */
  public abstract newInstance(): Role;

  /**
   * Deserializes a new  [[Role]] from a backend response from [[IRoleProvider]]
   */
  public abstract newInstanceFromJSON(json: any): Role;
}
