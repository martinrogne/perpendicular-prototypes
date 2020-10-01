import { ProductSearchResult, ProductSearchQuery } from '../models/productsearch.model';
import { ISearchFactory } from '../factories/base.factory';
import { Product } from '../models/product.model';
import { Facet } from '../models/facet.model';
import { FacetValue } from '../models/facetvalue.model';
/**
 * This class serves as an extension point for projects to hook into, and override specific model classes and their
 * deserialization.
 *
 * Perpendicular default behavior is to not know anything about how classes gets filled in. This is left as an excercies for the
 * backend components. That means, that all models here, are abstract superclasses, where each
 * backend component have to provide their own logic on how to deserialize the backend result message into the model.
 */
export abstract class IProductFactory extends ISearchFactory<Product, ProductSearchQuery, ProductSearchResult> {
  /**
   * Instantiates a new product search result from the backends json representation
   */
  public abstract newSearchResultInstanceFromJSON(json: any, query: ProductSearchQuery): ProductSearchResult;

  /**
   * Instantiates a new facet
   */
  public abstract newFacetInstance(): Facet;

  /**
   * Deserializes a new facet from the backend response
   */
  public abstract newFacetInstanceFromJSON(json: any): Facet;

  /**
   * instantiates a new facet value
   */
  public abstract newFacetValueInstance(): FacetValue;

  /**
   * deserializes a new facet value from the backend response.
   */
  public abstract newFacetValueInstanceFromJSON(json: any): FacetValue;
}
