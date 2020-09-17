import { FacetValue } from '../models/facetvalue.model';
import { BaseModel } from './base.model';
/**
 * This class represents one facet, with its associated display entries used to build search pages.
 * It will only contain the values actually in use by a given search result, unless the facet has been configured to allow
 * displaying of 0 result items. This is not the default.
 */
export class Facet extends BaseModel {
  /**
   * Display name of facet, in users currently selected language.
   */
  public name = '';

  /**
   * Backing attribute name (what is actually used for searching)
   */
  public facetAttr?: string;

  /**
   * The values to display for the facet.
   */
  public values: Array<FacetValue> = [];
}
