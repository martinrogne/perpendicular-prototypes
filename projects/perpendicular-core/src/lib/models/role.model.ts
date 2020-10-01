import { BaseModel } from './base.model';

/**
 * A Model class representing a user role
 *
 * @see IRoleFactory
 */
export class Role extends BaseModel {
  /**
   * ID of the Role
   */
  public id?: string;

  /**
   * The description of a role
   */
  public description = '';
}
