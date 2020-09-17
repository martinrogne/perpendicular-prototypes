import { BaseSearchQuery, BaseSearchResult } from './base.search.model';
import { Organization } from './organization.model';

/**
 * A Model class representing OrganizationSearchResults
 */
export class OrganizationSearchQuery extends BaseSearchQuery {
  /**
   * Parts of the name to find.
   */
  public name?: string;

  /**
   * Parts of the parent organization name to find
   */
  public parentName?: string;

  /**
   * Default constructor
   */
  constructor(q?: OrganizationSearchQuery) {
    super(q);

    if (!!q) {
      this.name = q.name;
      this.parentName = q.parentName;
    }
  }
}

/**
 * A Model class representing OrganizationSearchResults
 */
export class OrganizationSearchResult<
  OrganizationType extends Organization = Organization,
  OrganizationSearchQueryType extends OrganizationSearchQuery = OrganizationSearchQuery
> extends BaseSearchResult<OrganizationType, OrganizationSearchQueryType> {}
