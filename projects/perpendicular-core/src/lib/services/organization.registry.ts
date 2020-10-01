import { Organization } from '../models/organization.model';
import { IRegistry } from './base.registry';

/**
 * A lookup service for detailed [[Organization]] information.
 * Will cache data for repeated lookups.
 */
export abstract class IOrganizationRegistry<OrganizationType extends Organization = Organization> extends IRegistry<OrganizationType> {
  /**
   * Look up all details about the object based on its ID
   * @param id the id of the object to find.
   */
  public abstract getOrganization(id: string): Promise<OrganizationType>;

  /**
   * Optionally, add additional ways of lookup up an object, by adding more getXXX functions.
   * public abstract getOrganizationByOtherMeans(otherParameter1: string, otherParameter2): Promise<Organization>;
   */
}
