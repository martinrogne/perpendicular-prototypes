import { WCSProductFactory } from '@perpendicular/providers-wcs';
import { Injectable } from '@angular/core';
import { ProductSearchQuery, ProductSearchResult } from '@perpendicular/core';

/**
 * Prototype version of the WCS product factory to resolve any issues found
 * during implementation and test out alternatives. It currently resolves:
 *
 * 1) An issue where the totalPages wasn't being populated for the search reesult
 */
@Injectable()
export class PrototypeProductFactory extends WCSProductFactory {
  /**
   * Composes a new search result instance
   */
  protected composeSearchResultInstance(json: JSON, query: ProductSearchQuery): ProductSearchResult {
    const result = super.composeSearchResultInstance(json, query);

    result.totalPages = Math.ceil(result.totalCount / query.pageSize);

    return result;
  }
}
