import { Address } from './address.model';
import { BaseModel } from './base.model';

/**
 * A model class for representing an organization
 */
export class Organization extends BaseModel {
  /**
   * The name of the organization
   */
  public name = '';

  /**
   * The approval status of the organization, in cases where customers can request an account
   */
  public approvalStatus = '';

  /**
   * The state of the organization, 0 means locked, 1 means unlocked.
   */
  public isLocked = false;

  /**
   * The category associated with the particular industry in which
   * the organization resides
   */
  public businessCategory = '';

  /**
   * A description of the organization, for purposes of describing it further than
   * the name would allow
   */
  public description = '';

  /**
   * The unique identifier of the organization
   */
  public id?: string;

  /**
   * The type of the organization
   */
  public type = '';

  /**
   * The display-friendly variant of the organizations name
   */
  public displayName = '';

  /**
   * Main business address
   */
  public primaryAddress?: Address;

  /**
   * All addresses associated with this company
   */
  public addressBook: Address[] = [];

  /**
   * Parent organization
   */
  public parentOrganizationId?: string;

  /**
   * Tax ID
   */
  public taxId = '';

  /**
   * Legal ID
   */
  public legalId = '';

  /**
   * set of attributes associated with this organization.
   * Ideally, you would not access these directly, but rather provide a specialized
   * [[Organization]] object that accessed known values from this
   */
  public attributes: Map<string, string> = new Map<string, string>();
}
