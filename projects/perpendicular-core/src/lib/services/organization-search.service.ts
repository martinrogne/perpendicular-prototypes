import { ISearchService } from './base.search.service';

import { OrganizationSearchResult, OrganizationSearchQuery } from '../models/organization-search.model';
import { Organization } from '../models/organization.model';
/**
 * Stateful service for operating on [[OrganizationSearch ]].
 */
export abstract class IOrganizationSearchService<
  OrganizationType extends Organization = Organization,
  OrganizationSearchQueryType extends OrganizationSearchQuery = OrganizationSearchQuery,
  OrganizationSearchResultType extends OrganizationSearchResult<OrganizationType, OrganizationSearchQueryType> = OrganizationSearchResult<
    OrganizationType,
    OrganizationSearchQueryType
  >
> extends ISearchService<OrganizationType, OrganizationSearchQueryType, OrganizationSearchResultType> {
  /**
   * The organization name used for filtering the result set.
   */
  public abstract name: string;

  /**
   * The parent organization name used for filtering the result set.
   */
  public abstract parentOrganizationName: string;
}
