import { OrganizationSearchResult, OrganizationSearchQuery } from './../models/organization-search.model';
import { Organization } from '../models/organization.model';
import { ISearchProvider } from './base.search.provider';
/**
 * Provider to fetch [[Organization]] from backend systems.
 */
export abstract class IOrganizationProvider extends ISearchProvider<Organization, OrganizationSearchQuery, OrganizationSearchResult> {
  /**
   * Loads single entry from backend
   */
  public abstract getOrganizationById(id: string): Promise<Organization>;
}
