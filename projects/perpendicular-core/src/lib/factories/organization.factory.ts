import { OrganizationSearchQuery, OrganizationSearchResult } from './../models/organization-search.model';

import { Organization } from '../models/organization.model';
import { ISearchFactory } from '../factories/base.factory';

/**
 * An abstract factory to create instances of [[Organization]]
 */
export abstract class IOrganizationFactory extends ISearchFactory<Organization, OrganizationSearchQuery, OrganizationSearchResult> {}
