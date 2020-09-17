import { BaseModel } from './base.model';

/**
 * This class represents one value in a facet.
 */
export class FacetValue extends BaseModel {
  /**
   * Display name of value to show
   */
  public name = '';

  /**
   * The backing value to search for. This field does not necessarily make sense to an end user. It is machine readable only.
   * It should be considered a token.
   */
  public value?: string;

  /**
   * Number of results in total search result that would be shown, if this value is added to the search parameters.
   */
  public count = 0;
}
